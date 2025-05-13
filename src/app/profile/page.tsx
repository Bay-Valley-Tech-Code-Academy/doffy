import CardDisplay from './components/card-display';
import InformationForm from './components/forms/information-form';

export default function InformationProfilePage() {
  return (
    <CardDisplay displayTitle="Information">
      <InformationForm />
    </CardDisplay>
  );
}
