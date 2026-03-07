import type { components } from '@octokit/openapi-types/types.js';
export type PushFile = Pick<components['schemas']['diff-entry'], 'filename' | 'status' | 'patch'>;
export declare function getPushFiles(beforeSha: string, afterSha: string): Promise<PushFile[]>;
