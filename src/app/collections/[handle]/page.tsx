import { parseVariant } from "@/data/solids";
import { SolidsCollection } from "@/components/solids/SolidsCollection";

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const [{ handle }, { variant }] = await Promise.all([params, searchParams]);
  return <SolidsCollection handle={handle} variant={parseVariant(variant)} />;
}
