import RulesAddition from '../rules/RulesAddition';
import ExistingRules from '../rules/ExistingRules';
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"
export default function FirewallRulesView() {
  return (
    <div className="grid gap-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className='rounded-md border bg-white p-4 shadow-sm'>
          <AccordionTrigger className="cursor-pointer">Add Rules</AccordionTrigger>
          <AccordionContent>
            <RulesAddition />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className='rounded-md border bg-white p-4 shadow-sm'>
          <AccordionTrigger className="cursor-pointer">View all Rules</AccordionTrigger>
          <AccordionContent>
            <ExistingRules />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
