import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { jobsAmounts } from '../placeHolderData';
import JobsList from './jobs-list';

export default function JobTabs() {
  const tabsArray: Array<string> = ['Saved', 'Applied', 'Interviews', 'Archived'];
  
  const RenderTriggerTabs = () => {
    return tabsArray.map((tab) => (
      <TabsTrigger key={`Trigger-${tab}`} value={tab} className='flex flex-col'>
        <p className='self-start text-md md:text-lg'>{jobsAmounts[tab]}</p>
        <p className='text-md md:text-lg lg:text-2xl'>{tab}</p>
      </TabsTrigger>
    ));
  };

  const RenderContentTabs = () => {
    return tabsArray.map((tab) => (
        <TabsContent key={`Content-${tab}`} value={tab} className='h-5/6'>
            <JobsList filter={tab} />
        </TabsContent>))
  }

  return (
      <Tabs defaultValue="Saved" className='w-full h-full'>
        <div className='w-full h-auto border border-b-4 border-transparent border-b-inherit p-2'>
            <TabsList className='h-fit w-fit'>
              <RenderTriggerTabs />
            </TabsList>
        </div>
        <RenderContentTabs />
      </Tabs>
  );
}
