import { parseVariant } from "@/data/solids";
import { SolidsProduct } from "@/components/solids/SolidsProduct";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const [{ handle }, { variant }] = await Promise.all([params, searchParams]);
  return <SolidsProduct handle={handle} variant={parseVariant(variant)} />;
}
