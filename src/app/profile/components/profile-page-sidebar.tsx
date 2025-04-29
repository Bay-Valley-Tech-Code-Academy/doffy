import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
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
  itemNames: SideBarItemLinkObj[];
};

export type SideBarItemLinkObj = {
  itemName: string;
  hrefLink: string;
};

export default function ProfilePageSideBar() {
  const sideBarGroups: SideBarGroupObj[] = [
    {
      groupName: 'Account',
      itemNames: [
        { itemName: 'Information', hrefLink: '' },
        { itemName: 'Resume', hrefLink: 'resume' },
        { itemName: 'Certifications', hrefLink: 'certifications' },
      ],
    },
  ];

  // Renders the sidebar groups and populates all group items.
  const RenderMenuGroup = () => {
    return sideBarGroups.map(({ groupName, itemNames }) => {
      return (
        <SidebarGroup key={groupName}>
          <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemNames.map(({ itemName, hrefLink }) => {
                return (
                  <SidebarMenuItem key={itemName}>
                    <Link
                      href={{
                        pathname: `/profile/${hrefLink}`,
                        // slashes: true
                      }}
                    >
                      <SidebarMenuButton>{itemName}</SidebarMenuButton>
                    </Link>
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
