import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';

export type SideBarGroupObj = {
  groupName: string;
  itemNames: string[];
};

export default function ProfilePageSideBar() {
  const sideBarGroups: SideBarGroupObj[] = [
    { groupName: 'Account', itemNames: ['Information', 'Resume'] },
    { groupName: 'Job Matches', itemNames: ['Skills', 'Preferences', 'Hidden Jobs'] },
  ];

  // Renders the sidebar groups and populates all group items.
  const RenderMenuGroup = () => {
    return sideBarGroups.map(({ groupName, itemNames }) => {
      return (
        <SidebarGroup key={groupName}>
          <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemNames.map((item) => {
                return (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton>{item}</SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    });
  };

  return (
    // Inset by the height of the navbar
    <Sidebar className="inset-y-[55px] border-t-2">
      <SidebarContent>
        <SidebarHeader>Profile</SidebarHeader>
        <RenderMenuGroup />
      </SidebarContent>
    </Sidebar>
  );
}
