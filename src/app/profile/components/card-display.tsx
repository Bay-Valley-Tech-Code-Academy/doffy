import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface CardDisplayProps {
    children: React.ReactNode;
    displayTitle: string;
}

export default function CardDisplay({children, displayTitle}: CardDisplayProps) {
    return (<Card>
        <CardHeader>
          <CardTitle>{displayTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>)
}