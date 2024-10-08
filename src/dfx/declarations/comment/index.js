import { Actor, HttpAgent } from '@dfinity/agent';

// Imports and re-exports candid interface
import { idlFactory } from './comment.did.js';
import { LANG } from '@/constant/language';
export { idlFactory } from './comment.did.js';

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
const englishCanisterId =
  process.env.CANISTER_ID_COMMENT ||
  process.env.NEXT_PUBLIC_COMMENT_CANISTER_ID;
const staggingCanisterID =
  process.env.CANISTER_ID_COMMENT_SG ||
  process.env.NEXT_PUBLIC_COMMENT_SG_CANISTER_ID;
const japaneseCanisterId =
  process.env.CANISTER_ID_COMMENT_JP ||
  process.env.NEXT_PUBLIC_COMMENT_JP_CANISTER_ID;
// export const canisterId =
//   LANG === 'jp' ? japaneseCanisterId : englishCanisterId;

let tempCanisterId = null;
if (process.env.NEXT_PUBLIC_STAGGING=="true") {
  tempCanisterId = staggingCanisterID;
} else if (LANG == 'jp') {
  tempCanisterId = japaneseCanisterId;
} else if (LANG == 'en') {
  tempCanisterId = englishCanisterId;
}
export const canisterId = tempCanisterId;

// export const canisterId =
//   process.env.CANISTER_ID_COMMENT || process.env.NEXT_PUBLIC_COMMENT_CANISTER_ID;

export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      'Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.'
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== 'ic') {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        'Unable to fetch root key. Check to ensure that your local replica is running'
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};
