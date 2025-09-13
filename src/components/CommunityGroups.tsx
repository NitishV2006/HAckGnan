import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";

interface CommunityGroupsProps {
  groups: Array<{
    name: string;
    members: number;
    icon: string;
    description: string;
  }>;
}

export const CommunityGroups = ({ groups }: CommunityGroupsProps) => {
  return (
    <Card className="wellness-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-wellness-primary" />
          Wellness Communities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.name} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-wellness-primary/5 to-wellness-secondary/5 border border-wellness-primary/10">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{group.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm">{group.name}</h3>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                  <p className="text-xs text-wellness-primary font-medium">
                    {group.members.toLocaleString()} members
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-wellness-primary/20 hover:bg-wellness-primary/10">
                <UserPlus className="h-3 w-3 mr-1" />
                Join
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};