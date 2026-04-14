import type { HandoffPackage, ResultCollectionPacket, UnifiedEnvelope } from '../../contracts/block-c-dispatcher';
import { InvalidPackagingInputError } from '../../contracts/block-c-dispatcher';
import { assertValidResultCollectionPacket, assertValidUnifiedEnvelope } from './validate-packaging-input';

export function createHandoffPackage(
  envelope: UnifiedEnvelope,
  resultCollection: ResultCollectionPacket
): HandoffPackage {
  assertValidUnifiedEnvelope(envelope);
  assertValidResultCollectionPacket(resultCollection);

  if (envelope.targetRole !== resultCollection.targetRole) {
    throw new InvalidPackagingInputError('Handoff package requires aligned envelope and result collection targets');
  }

  return {
    packetKind: 'non-authoritative-handoff-package',
    envelope,
    resultCollection,
    nonAuthoritative: true,
    acceptance: false,
    verificationPass: false,
    durableTruthPromotion: false
  };
}
