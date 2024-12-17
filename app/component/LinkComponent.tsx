import Link from "next/link";
export default function LinkComponent({
  url,
  text,
}: {
  url: string;
  text: string;
}) {
  return (
    <div>
      <Link href={url} className="transition text-white hover:text-sunny-light">
        {text}
      </Link>
    </div>
  );
}
