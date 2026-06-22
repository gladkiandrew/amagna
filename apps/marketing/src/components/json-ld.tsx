/**
 * Tiny reusable JSON-LD emitter. Pass any schema.org object (or array) and it
 * renders the <script type="application/ld+json"> tag. Keeps structured data
 * consistent across the keyword/service pages without re-writing the boilerplate.
 */
export function JsonLd({ data }: { data: object | object[] }): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
