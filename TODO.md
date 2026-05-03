# Checkout Controller Fix - Progress Tracker

## ✅ Completed Steps
- [x] 1. Create this TODO.md 
- [x] 2. Fix RajaOngkirService.php (estimasi_hari_min/max parsing, error handling)
- [x] 3. Update CheckoutController.php index() - remove ongkir_map (performance), fix lensa caching
- [x] 4. Update proses() - dynamic berat calculation, total_harga, fixed subtotal syntax
- [x] 5. Improved hitungHargaLensa consistency
- [ ] 6. Add calculateOngkir() for frontend dynamic ongkir 
- [ ] 7. Wrap proses in DB::transaction + stock validation
- [ ] 8. Frontend checkout.tsx - remove ongkir_map dependency, add dynamic fetch
- [ ] 9. Test & complete

## Current Status
**Core backend fixes completed. CheckoutController now efficient, correct pricing/ongkir. Frontend needs dynamic ongkir update.**

**Next:** Add calculateOngkir endpoint.
