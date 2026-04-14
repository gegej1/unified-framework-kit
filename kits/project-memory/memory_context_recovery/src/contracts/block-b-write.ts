export type FeatureStateSnapshot = {
  activeFeatureId: string;
  stateVersion: number;
  updatedAt: string;
};

export type CurrentTaskSnapshot = {
  taskId: string;
  activeFeatureId: string;
  updatedAt: string;
};

export type WorkingStateWriteTarget = 'feature-state' | 'current-task';

export type MemoryControlWriteRequest =
  | {
      rootDirectory: string;
      target: 'feature-state';
      snapshot: FeatureStateSnapshot;
    }
  | {
      rootDirectory: string;
      target: 'current-task';
      snapshot: CurrentTaskSnapshot;
    };

export type MemoryControlWriteResult = {
  target: WorkingStateWriteTarget;
  path: string;
  content: string;
  bytesWritten: number;
  durableTouched: false;
};

export class InvalidWorkingStateWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidWorkingStateWriteError';
  }
}
