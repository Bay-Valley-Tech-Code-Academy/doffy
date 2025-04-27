import CardDisplay from "../components/card-display";
import ResumeForm from "../components/forms/resume-form";

export default function ResumeProfilePage() {
  return (
    <CardDisplay displayTitle="Resume">
      <ResumeForm />
    </CardDisplay>
  );
}
