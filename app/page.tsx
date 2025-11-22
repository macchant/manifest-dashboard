"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Package } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("manifest")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) setData(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const filtered = data.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.pengirim?.toLowerCase().includes(q) ||
      item.penerima?.toLowerCase().includes(q) ||
      item.nama_barang?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-gray-900 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">Dashboard Manifest</h1>
        <p className="text-gray-300 mt-1">
          Data semua paket yang telah diinput pada sistem
        </p>

        <div className="mt-4 flex items-center gap-4">
          <Card className="bg-gray-800 text-white px-6 py-3 shadow">
            <CardContent className="p-0 flex items-center gap-2">
              <Package className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-semibold">{data.length}</span>
              <span className="text-sm opacity-70 ml-1">Total Paket</span>
            </CardContent>
          </Card>

          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Refresh Data"}
          </Button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Cari pengirim, penerima, atau barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 py-6 text-base shadow bg-white"
          />
        </div>
      </div>

      {/* DATA GRID */}
      <div className="max-w-6xl mx-auto mt-8 p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.id} className="shadow bg-white border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold truncate">
                {item.nama_barang}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm space-y-1">
              <p><strong>Pengirim:</strong> {item.pengirim}</p>
              <p><strong>Penerima:</strong> {item.penerima}</p>
              <p><strong>Berat:</strong> {item.berat} kg</p>
              <p><strong>Harga:</strong> Rp{item.harga}</p>
              <p><strong>Ongkir:</strong> Rp{item.ongkir}</p>
              <p><strong>Metode:</strong> {item.metode}</p>
              <p><strong>Ekspedisi:</strong> {item.ekspedisi}</p>

              <p className="text-gray-500 text-xs mt-3">
                #{item.id} • {new Date(item.created_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          Tidak ada data ditemukan...
        </p>
      )}
    </div>
  );
}
