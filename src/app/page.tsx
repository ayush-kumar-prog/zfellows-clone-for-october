import { parseVariant } from "@/data/solids";
import { SolidsHome } from "@/components/solids/SolidsHome";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  return <SolidsHome variant={parseVariant(variant)} />;
}
