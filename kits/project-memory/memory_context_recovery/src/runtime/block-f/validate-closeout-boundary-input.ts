import type {
  ClosureArtifactDescriptor,
  ClosureNonAuthorityInput,
  OverlayPackagingDescriptor,
  SummaryArtifactDescriptor
} from '../../contracts/block-f-closeout';
import type { CoreRuntimeRole, HandoffPackage, ResultCollectionPacket, UnifiedEnvelope } from '../../contracts/block-c-dispatcher';
import { InvalidCloseoutBoundaryInputError } from '../../contracts/block-f-closeout';
import { coreRuntimeRoles } from '../../contracts/block-c-dispatcher';

const allowedInputKeys = new Set(['resultCollection', 'handoffPackage', 'descriptors']);
const allowedDescriptorKinds = new Set(['closeout', 'summary', 'overlay-packaging']);

export function assertValidCloseoutBoundaryInput(
  input: unknown
): asserts input is ClosureNonAuthorityInput {
  if (!isRecord(input)) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall requires bounded closure artifacts');
  }

  const unexpectedKeys = Object.keys(input).filter((key) => !allowedInputKeys.has(key));
  if (unexpectedKeys.length > 0) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall rejects unexpected closure artifacts');
  }

  assertValidResultCollectionPacket(input.resultCollection);
  assertValidHandoffPackage(input.handoffPackage);

  if (!Array.isArray(input.descriptors) || input.descriptors.length === 0) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall requires explicit non-authoritative closure descriptors');
  }

  input.descriptors.forEach(assertValidClosureDescriptor);
}

function assertValidResultCollectionPacket(packet: unknown): asserts packet is ResultCollectionPacket {
  if (
    !isRecord(packet) ||
    packet.packetKind !== 'non-authoritative-result-collection' ||
    packet.sourceRole !== 'dispatcher' ||
    !isCoreRuntimeRole(packet.targetRole) ||
    !isNonEmptyString(packet.activeFeatureId) ||
    !isNonEmptyString(packet.taskId) ||
    packet.nonAuthoritative !== true ||
    packet.acceptance !== false ||
    packet.verificationPass !== false ||
    packet.durableTruthPromotion !== false
  ) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall requires a valid non-authoritative result collection packet');
  }
}

function assertValidHandoffPackage(packet: unknown): asserts packet is HandoffPackage {
  if (
    !isRecord(packet) ||
    packet.packetKind !== 'non-authoritative-handoff-package' ||
    packet.nonAuthoritative !== true ||
    packet.acceptance !== false ||
    packet.verificationPass !== false ||
    packet.durableTruthPromotion !== false
  ) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall requires a valid non-authoritative handoff package');
  }

  assertValidUnifiedEnvelope(packet.envelope);
  assertValidResultCollectionPacket(packet.resultCollection);

  if (packet.envelope.targetRole !== packet.resultCollection.targetRole) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall requires aligned handoff artifacts');
  }
}

function assertValidUnifiedEnvelope(envelope: unknown): asserts envelope is UnifiedEnvelope {
  if (
    !isRecord(envelope) ||
    envelope.envelopeKind !== 'unified-dispatch-envelope' ||
    envelope.sourceRole !== 'dispatcher' ||
    !isCoreRuntimeRole(envelope.targetRole) ||
    envelope.nonAuthoritative !== true ||
    envelope.acceptance !== false ||
    envelope.verificationPass !== false ||
    envelope.durableTruthPromotion !== false ||
    !isRecord(envelope.slice) ||
    envelope.slice.targetRole !== envelope.targetRole ||
    !isRecord(envelope.routing) ||
    envelope.routing.targetRole !== envelope.targetRole
  ) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall requires a valid unified handoff envelope');
  }
}

function assertValidClosureDescriptor(descriptor: unknown): asserts descriptor is ClosureArtifactDescriptor {
  if (
    !isRecord(descriptor) ||
    !allowedDescriptorKinds.has(descriptor.artifactKind) ||
    !isNonEmptyString(descriptor.artifactId) ||
    descriptor.nonAuthoritative !== true ||
    descriptor.acceptance !== false ||
    descriptor.verificationPass !== false ||
    descriptor.durableTruthPromotion !== false ||
    descriptor.truthMutation !== false ||
    descriptor.statusRedefinition !== false ||
    descriptor.durableRecordReplacement !== false
  ) {
    throw new InvalidCloseoutBoundaryInputError('Closeout non-authority firewall requires valid non-authoritative closure descriptors');
  }

  if (descriptor.artifactKind === 'summary') {
    const summary = descriptor as SummaryArtifactDescriptor;
    if (summary.freezeOwner !== false || summary.truthCarrier !== false) {
      throw new InvalidCloseoutBoundaryInputError('Summary descriptors may not claim freeze ownership or truth carriage');
    }
  }

  if (descriptor.artifactKind === 'overlay-packaging') {
    const overlay = descriptor as OverlayPackagingDescriptor;
    if (overlay.authorityLayer !== false) {
      throw new InvalidCloseoutBoundaryInputError('Overlay packaging may not claim authority layer status');
    }
  }
}

function isCoreRuntimeRole(value: unknown): value is CoreRuntimeRole {
  return typeof value === 'string' && coreRuntimeRoles.includes(value as CoreRuntimeRole);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}
