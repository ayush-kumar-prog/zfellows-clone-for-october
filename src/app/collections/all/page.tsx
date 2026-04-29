import { parseVariant } from "@/data/solids";
import { SolidsCollection } from "@/components/solids/SolidsCollection";

export default async function AllCollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  return <SolidsCollection handle="all" variant={parseVariant(variant)} />;
}
