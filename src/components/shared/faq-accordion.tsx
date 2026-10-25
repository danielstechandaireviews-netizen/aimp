import type { FaqItem } from "@/content/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <Accordion type="multiple" className={cn("rounded-2xl border bg-card px-5 sm:px-6", className)}>
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`faq-${i}`}>
          <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">{item.question}</AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
