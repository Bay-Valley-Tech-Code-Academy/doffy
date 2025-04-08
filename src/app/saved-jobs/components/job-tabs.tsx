import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { jobsAmounts } from '../placeHolderData';
import JobsList from './jobs-list';

export default function JobTabs() {
  const tabsArray: string[] = ['Saved', 'Applied', 'Interviews', 'Archived'];

  const RenderTriggerTabs = () => {
    return tabsArray.map((tab: string) => (
      <TabsTrigger key={`Trigger-${tab}`} value={tab} className="flex flex-col">
        <p className="text-md self-start md:text-lg">{jobsAmounts[tab]}</p>
        <p className="text-md md:text-lg lg:text-2xl">{tab}</p>
      </TabsTrigger>
    ));
  };

  const RenderContentTabs = () => {
    return tabsArray.map((tab) => (
      <TabsContent
        key={`Content-${tab}`}
        value={tab}
        className="h-[calc(100%-5rem)] md:h-[calc(100%-7rem)]"
      >
        <JobsList filter={tab} />
      </TabsContent>
    ));
  };

  return (
    <Tabs defaultValue="Saved" className="h-full w-full">
      <div className="h-auto w-full border border-b-4 border-transparent border-b-inherit p-2">
        <TabsList className="h-14 w-fit md:h-20">
          <RenderTriggerTabs />
        </TabsList>
      </div>
      <RenderContentTabs />
    </Tabs>
  );
}
