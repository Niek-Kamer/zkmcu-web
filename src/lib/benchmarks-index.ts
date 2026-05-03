// Central registry of benchmark rows referenced by doc-site pages. Each
// entry names the (run slug, bench name) pair that `us()` needs to fetch
// a single number from `benchmarks/runs/*/result.toml` at build time.
//
// When a canonical run gets replaced (e.g. a rebaseline), update the slug
// here and every page picks up the new number automatically. MDX pages
// should call `usAt('<key>')` rather than repeating slug + bench name at
// each call site.

import { us } from './benchmarks';

export const BENCHMARKS = {
	// STARK headline (TlsfHeap, 95-bit Quadratic), the production pick.
	// Updated 2026-04-28 audit: repoint at bench-core rebaseline runs
	// wich are the same circuit and config measured under the unified
	// firmware harness; supersedes the older `*-stark-fib-1024-q-tlsf/`
	// pointers (74.65 / 112.40 ms) with 73.20 / 107.96 ms.
	stark_m33_tlsf: {
		slug: '2026-04-24-bench-core-m33-stark-goldilocks',
		bench: 'stark_verify_fib_1024_q_tlsf',
	},
	stark_rv32_tlsf: {
		slug: '2026-04-24-bench-core-rv32-stark-goldilocks',
		bench: 'stark_verify_fib_1024_q_tlsf',
	},

	// STARK allocator-comparison rows (LlffHeap + BumpAlloc) for the
	// benchmarks page. Same circuit + ISA as `stark_*_tlsf`, only the
	// allocator changes between runs.
	stark_m33_llff: {
		slug: '2026-04-24-m33-stark-fib-1024-q-clone-hoisted',
		bench: 'stark_verify_fib_1024_q_no_clone',
	},
	stark_rv32_llff: {
		slug: '2026-04-24-rv32-stark-fib-1024-q-clone-hoisted',
		bench: 'stark_verify_fib_1024_q_no_clone',
	},
	stark_m33_bump: {
		slug: '2026-04-24-m33-stark-fib-1024-q-bump',
		bench: 'stark_verify_fib_1024_q_bump',
	},
	stark_rv32_bump: {
		slug: '2026-04-24-rv32-stark-fib-1024-q-bump',
		bench: 'stark_verify_fib_1024_q_bump',
	},

	// STARK on-device prover — Phase 4 (Goldilocks+None, ~32-bit security, N=256)
	stark_m33_prove_p4: {
		slug: '2026-04-26-m33-stark-prover-fib',
		bench: 'stark_prove_fib_n256',
	},
	stark_rv32_prove_p4: {
		slug: '2026-04-26-m33-stark-prover-fib',
		bench: 'stark_prove_fib_n256_rv32',
	},
	stark_m33_verify_p4: {
		slug: '2026-04-26-m33-stark-prover-fib',
		bench: 'stark_verify_fib_n256',
	},
	stark_rv32_verify_p4: {
		slug: '2026-04-26-m33-stark-prover-fib',
		bench: 'stark_verify_fib_n256_rv32',
	},

	// STARK on-device prover — threshold-check circuit (first real predicate, N=64, 64 queries, 123-bit)
	threshold_m33_prove: {
		slug: '2026-04-27-m33-stark-threshold-q64',
		bench: 'stark_prove',
	},
	threshold_m33_verify: {
		slug: '2026-04-27-m33-stark-threshold-q64',
		bench: 'stark_verify',
	},

	// STARK on-device prover — Phase 5 (BabyBear+Quartic, ~95-bit security, N=256)
	stark_m33_prove_bb: {
		slug: '2026-04-26-m33-stark-prover-bb',
		bench: 'stark_prove_fib_n256',
	},
	stark_rv32_prove_bb: {
		slug: '2026-04-26-rv32-stark-prover-bb',
		bench: 'stark_prove_fib_n256',
	},
	stark_m33_verify_bb: {
		slug: '2026-04-26-m33-stark-prover-bb',
		bench: 'stark_verify_fib_n256',
	},
	stark_rv32_verify_bb: {
		slug: '2026-04-26-rv32-stark-prover-bb',
		bench: 'stark_verify_fib_n256',
	},

	// BN254 Groth16 headline (1 public input, square circuit)
	// Updated 2026-04-28: rebaseline run replaces the unoptimized
	// heap-96k-confirmed pointer (962 ms) with the post-UMAAL +
	// post-cost-breakdown firmware (551 ms).
	bn254_m33: {
		slug: '2026-04-28-m33-bn254-rebench',
		bench: 'groth16_verify',
	},
	bn254_rv32: {
		slug: '2026-04-21-rv32-stack-painted',
		bench: 'groth16_verify',
	},

	// BN254 Groth16 on a real Semaphore v4 depth-10 proof (4 big-scalar public inputs)
	bn254_m33_semaphore: {
		slug: '2026-04-22-m33-semaphore-depth10',
		bench: 'groth16_verify_semaphore',
	},
	bn254_rv32_semaphore: {
		slug: '2026-04-22-rv32-semaphore-depth10',
		bench: 'groth16_verify_semaphore',
	},

	// BLS12-381 Groth16 headline (1 public input, square circuit)
	bls12_m33: {
		slug: '2026-04-22-m33-bls12-baseline',
		bench: 'groth16_verify_square',
	},
	bls12_rv32: {
		slug: '2026-04-22-rv32-bls12-baseline',
		bench: 'groth16_verify_square',
	},

	// BN254 per-op from the stack-painted firmware runs
	bn254_m33_g1_mul: { slug: '2026-04-21-m33-stack-painted', bench: 'g1_mul' },
	bn254_m33_g2_mul: { slug: '2026-04-21-m33-stack-painted', bench: 'g2_mul' },
	bn254_m33_pairing: { slug: '2026-04-21-m33-stack-painted', bench: 'pairing' },
	bn254_rv32_g1_mul: { slug: '2026-04-21-rv32-stack-painted', bench: 'g1_mul' },
	bn254_rv32_g2_mul: { slug: '2026-04-21-rv32-stack-painted', bench: 'g2_mul' },
	bn254_rv32_pairing: {
		slug: '2026-04-21-rv32-stack-painted',
		bench: 'pairing',
	},

	// BLS12-381 per-op from the bls12 baseline runs
	bls12_m33_g1_mul: { slug: '2026-04-22-m33-bls12-baseline', bench: 'g1_mul' },
	bls12_m33_g2_mul: { slug: '2026-04-22-m33-bls12-baseline', bench: 'g2_mul' },
	bls12_m33_pairing: {
		slug: '2026-04-22-m33-bls12-baseline',
		bench: 'pairing',
	},
	bls12_rv32_g1_mul: {
		slug: '2026-04-22-rv32-bls12-baseline',
		bench: 'g1_mul',
	},
	bls12_rv32_g2_mul: {
		slug: '2026-04-22-rv32-bls12-baseline',
		bench: 'g2_mul',
	},
	bls12_rv32_pairing: {
		slug: '2026-04-22-rv32-bls12-baseline',
		bench: 'pairing',
	},

	// PQ-Semaphore depth-10 STARK — five-phase 128-bit security plan.
	// Each phase rebuilds the verifier with one knob changed and re-measures
	// on both ISAs. Numbers feed the dated writeup at
	// /research/2026-04-30-pq-semaphore-128bit/. Phase E.1 is the headline.
	//
	// Phase 0 — baseline (Phase B vector + 16-bit grinding, ~95-bit conj.).
	pq_sem_m33_p0: {
		slug: '2026-04-29-m33-pq-semaphore',
		bench: 'pq_semaphore_verify',
	},
	pq_sem_rv32_p0: {
		slug: '2026-04-29-rv32-pq-semaphore',
		bench: 'pq_semaphore_verify',
	},
	// Phase A — grinding 16+16 → 32 bits PoW, +1 query (~111-bit conj.).
	pq_sem_m33_pa: {
		slug: '2026-04-29-m33-pq-semaphore-grind32',
		bench: 'pq_semaphore_verify',
	},
	pq_sem_rv32_pa: {
		slug: '2026-04-29-rv32-pq-semaphore-grind32',
		bench: 'pq_semaphore_verify',
	},
	// Phase B — DIGEST_WIDTH 4 → 6 (Poseidon2 floor 124 → 186 bits).
	pq_sem_m33_pb: {
		slug: '2026-04-29-m33-pq-semaphore-d6',
		bench: 'pq_semaphore_verify',
	},
	pq_sem_rv32_pb: {
		slug: '2026-04-29-rv32-pq-semaphore-d6',
		bench: 'pq_semaphore_verify',
	},
	// Phase C — two-stage early-exit; honest verify cost.
	pq_sem_m33_pc: {
		slug: '2026-04-29-m33-pq-semaphore-reject',
		bench: 'honest_verify',
	},
	pq_sem_rv32_pc: {
		slug: '2026-04-29-rv32-pq-semaphore-reject',
		bench: 'honest_verify',
	},
	// Phase D — Goldilocks × Quadratic alternative (rejected, +87/+113%).
	pq_sem_m33_pd: {
		slug: '2026-04-29-m33-pq-semaphore-gl',
		bench: 'pq_semaphore_gl_verify',
	},
	pq_sem_rv32_pd: {
		slug: '2026-04-29-rv32-pq-semaphore-gl',
		bench: 'pq_semaphore_gl_verify',
	},
	// Phase E.1 — stacked Poseidon2 + Blake3 dual-hash (headline, 127+ PQ).
	pq_sem_m33_pe1: {
		slug: '2026-04-30-m33-pq-semaphore-dual',
		bench: 'pq_semaphore_dual_verify',
	},
	pq_sem_rv32_pe1: {
		slug: '2026-04-30-rv32-pq-semaphore-dual',
		bench: 'pq_semaphore_dual_verify',
	},
} as const;

export type BenchKey = keyof typeof BENCHMARKS;

export function usAt(key: BenchKey): number {
	const { slug, bench } = BENCHMARKS[key];
	return us(slug, bench);
}
