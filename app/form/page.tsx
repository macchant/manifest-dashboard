"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ManifestForm() {
  const [form, setForm] = useState({
    pengirim: "",
    penerima: "",
    nama_barang: "",
    berat: "",
    harga: "",
    ongkir: "",
    metode: "",
    ekspedisi: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(key: string, value: string) {
    setForm({ ...form, [key]: value });
  }

  async function submitForm() {
    setLoading(true);
    setSuccess(false);

    const { error } = await supabase.from("manifest").insert({
      pengirim: form.pengirim,
      penerima: form.penerima,
      nama_barang: form.nama_barang,
      berat: Number(form.berat),
      harga: Number(form.harga),
      ongkir: Number(form.ongkir),
      metode: form.metode,
      ekspedisi: form.ekspedisi,
    });

    setLoading(false);

    if (!error) {
      setSuccess(true);

      setForm({
        pengirim: "",
        penerima: "",
        nama_barang: "",
        berat: "",
        harga: "",
        ongkir: "",
        metode: "",
        ekspedisi: "",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="w-full bg-red-600 p-4 text-white shadow">
        <h1 className="text-xl font-bold text-center tracking-wide">
          INPUT MANIFEST PENGIRIMAN
        </h1>
        <p className="text-center text-sm text-white/80">
          Sistem Internal Outlet Pengiriman
        </p>
      </div>

      {/* FORM */}
      <div className="p-4 max-w-2xl mx-auto">
        <Card className=" shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Form Manifest (Seperti Aplikasi Kasir Ekspedisi)
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium text-sm">Nama Pengirim</label>
              <Input
                placeholder="cth: Budi Santoso"
                value={form.pengirim}
                onChange={(e) => updateField("pengirim", e.target.value)}
                className="text-base py-6"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm">Nama Penerima</label>
              <Input
                placeholder="cth: Ani Pratiwi"
                value={form.penerima}
                onChange={(e) => updateField("penerima", e.target.value)}
                className="text-base py-6"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm">Nama Barang</label>
              <Input
                placeholder="cth: Kemeja, Sparepart, Alat Rumah"
                value={form.nama_barang}
                onChange={(e) => updateField("nama_barang", e.target.value)}
                className="text-base py-6"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium text-sm">Berat (kg)</label>
                <Input
                  type="number"
                  placeholder="cth: 1.2"
                  value={form.berat}
                  onChange={(e) => updateField("berat", e.target.value)}
                  className="text-base py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium text-sm">Harga Barang</label>
                <Input
                  type="number"
                  placeholder="cth: 150000"
                  value={form.harga}
                  onChange={(e) => updateField("harga", e.target.value)}
                  className="text-base py-6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm">Ongkir</label>
              <Input
                type="number"
                placeholder="cth: 12000"
                value={form.ongkir}
                onChange={(e) => updateField("ongkir", e.target.value)}
                className="text-base py-6"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium text-sm">Metode Pembayaran</label>
                <Input
                  placeholder="COD / DFOD / NON COD"
                  value={form.metode}
                  onChange={(e) => updateField("metode", e.target.value)}
                  className="text-base py-6 uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium text-sm">Jasa Ekspedisi</label>
                <Input
                  placeholder="JNT / JNE / SICEPAT / dll"
                  value={form.ekspedisi}
                  onChange={(e) => updateField("ekspedisi", e.target.value)}
                  className="text-base py-6 uppercase"
                />
              </div>
            </div>

            <Button
              onClick={submitForm}
              disabled={loading}
              className="w-full py-6 text-lg font-bold bg-red-600 hover:bg-red-700"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Simpan Manifest"}
            </Button>

            {success && (
              <p className="text-green-600 text-center font-medium mt-2">
                Data berhasil disimpan!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
