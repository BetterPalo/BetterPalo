/**
 * The fictional sample guide in examples/services/ loads only when the build runs
 * with SAMPLE_CONTENT=true (CI's e2e job). Production builds leave it off, and
 * scripts/check-no-sample.mjs fails the deploy if the marker reaches dist/.
 */
export const SAMPLE_CONTENT_ENABLED = process.env.SAMPLE_CONTENT === 'true';
/** Appears in every sample guide's description. Keep equal to MARKER in scripts/check-no-sample.mjs. */
export const SAMPLE_MARKER = 'betterlgu-sample-content';
export const SAMPLE_ID = 'sample-business-permit';
