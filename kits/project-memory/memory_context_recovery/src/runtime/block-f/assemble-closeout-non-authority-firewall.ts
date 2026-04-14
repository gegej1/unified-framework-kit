import type { ClosureNonAuthorityFirewallResult, ClosureNonAuthorityInput } from '../../contracts/block-f-closeout';
import { assertValidCloseoutBoundaryInput } from './validate-closeout-boundary-input';

export function assembleCloseoutNonAuthorityFirewall(
  input: ClosureNonAuthorityInput
): ClosureNonAuthorityFirewallResult {
  assertValidCloseoutBoundaryInput(input);

  return {
    firewallKind: 'closeout-non-authority-firewall',
    admittedArtifactKinds: [
      'result-collection',
      'handoff',
      ...input.descriptors.map((descriptor) => descriptor.artifactKind)
    ],
    excludedAuthorityDriftClasses: [
      'acceptance',
      'verification-pass',
      'durable-truth-promotion',
      'truth-mutation',
      'status-redefinition',
      'durable-record-replacement',
      'freeze-owner',
      'truth-carrier',
      'authority-layer'
    ],
    closeoutWorkflowImplemented: false,
    nonAuthoritative: true,
    executesCloseout: false,
    durableTouched: false
  };
}
