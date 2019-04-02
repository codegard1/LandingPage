/*
NOTICE
This file contains the default values for many of the components on
the landing page. All of these objects are imported to App State and
then passed to children components as props. (Chris Odegard 4/24/2017)
*/

/* foundational URLs used in all of the REST calls */
export const DOMAIN = "https://privatebrand.com";
// export const DOMAIN = ""; /* blank in order to force relative URLs */
export const BASEURL = `${DOMAIN}/sites/portal`;

/* function to set the TODAY value used in some REST calls */
export function setToday() {
  let today = new Date(); // first get today's date as a Date object

  /* then set the hours, minutes, seconds, and milliseconds of the date to 0 */
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  /* finally, set it to a string */
  return today.toISOString();
}

/* Function for menu items in CommandBar */
function onItemClick(ev) {
  ev.preventDefault();
}

/* Items for NavDefinition */
const allFOB = [
  {
    key: "bpi",
    name: "Business Process & Initiatives",
    ariaLabel: "Business Process & Initiatives",
    href: `${BASEURL}/bpi`,
    url: `${BASEURL}/bpi`,
    isExpanded: false
  },
  {
    key: "facilities",
    name: "Facilities",
    ariaLabel: "Facilities",
    href: `${BASEURL}/facilities`,
    url: `${BASEURL}/facilities`
  },
  {
    key: "finance",
    name: "Finance",
    ariaLabel: "Finance",
    href: `${BASEURL}/finance`,
    url: `${BASEURL}/finance`
  },
  {
    key: "forms",
    name: "Forms",
    ariaLabel: "Forms",
    href: `${BASEURL}/forms`,
    url: `${BASEURL}/forms`
  },
  {
    key: "gbp",
    name: "Global Business Partners",
    ariaLabel: "Global Business Partners",
    href: `${BASEURL}/gbp`,
    url: `${BASEURL}/gbp`
  },
  {
    key: "hr",
    name: "Human Resources",
    ariaLabel: "Human Resources",
    href: `${BASEURL}/hr`,
    url: `${BASEURL}/hr`
  },
  {
    key: "logistics",
    name: "Logistics",
    ariaLabel: "Logistics",
    href: `${BASEURL}/logistics`,
    url: `${BASEURL}/logistics`
  },
  {
    key: "marketing",
    name: "Marketing",
    ariaLabel: "Marketing",
    href: `${BASEURL}/marketing`,
    url: `${BASEURL}/marketing`
  },
  {
    key: "overseas",
    name: "Overseas",
    ariaLabel: "Overseas",
    href: `${BASEURL}/overseas`,
    url: `${BASEURL}/overseas`
  },
  {
    key: "pp",
    name: "Packaging & Production",
    ariaLabel: "Packaging & Production",
    href: `${BASEURL}/packagingproduction`,
    url: `${BASEURL}/packagingproduction`
  },
  {
    key: "piqa",
    name: "PI / QA",
    ariaLabel: "PI/QA",
    href: `${BASEURL}/piqa`,
    url: `${BASEURL}/piqa`
  },
  {
    key: "pbt",
    name: "Private Brands Technology",
    ariaLabel: "Private Brands Technology",
    href: `${BASEURL}/pbt`,
    url: `${BASEURL}/pbt`
  },
  {
    key: "pc",
    name: "Project Collaboration",
    ariaLabel: "Project Collaboration",
    href: `${BASEURL}/projectcollaboration`,
    url: `${BASEURL}/projectcollaboration`
  },
  {
    key: "replenishment",
    name: "Replenishment",
    ariaLabel: "Replenishment",
    href: `${BASEURL}/replenishment`,
    url: `${BASEURL}/replenishment`
  }
];

/* links for the O365 Apps menu */
const o365Apps = [
  {
    key: "mail",
    name: "Mail",
    ariaLabel: "Mail",
    iconProps: { iconName: "OutlookLogo" },
    href:
      "https://outlook.office365.com/"
  },
  {
    key: "Calendar",
    name: "Calendar",
    ariaLabel: "Calendar",
    iconProps: { iconName: "Calendar" },
    href:
      "https://outlook.office365.com/"
  },
  {
    key: "People",
    name: "People",
    ariaLabel: "People",
    iconProps: { iconName: "People" },
    href:
      "https://outlook.office365.com/"
  },
  {
    key: "Yammer",
    name: "Yammer",
    ariaLabel: "Yammer",
    iconProps: { iconName: "YammerLogo" },
    href: "https://www.yammer.com/"
  },
  {
    key: "OneDrive",
    name: "OneDrive",
    ariaLabel: "OneDrive",
    iconProps: { iconName: "OneDrive" },
    href:
      "https://onedrive.com"
  },
  {
    key: "onenote",
    name: "OneNote",
    ariaLabel: "OneNote",
    iconProps: { iconName: "OneNoteLogo" },
    href: "https://www.onenote.com/notebooks"
  },
  {
    key: "sway",
    name: "Sway",
    ariaLabel: "Sway",
    iconProps: { iconName: "SwayLogo" },
    href: "https://sway.com"
  },
  {
    key: "teams",
    name: "Teams",
    ariaLabel: "Teams",
    iconProps: { iconName: "TeamsLogo" },
    href: "https://teams.microsoft.com/"
  },
  {
    key: "officevideo",
    name: "Office Video",
    ariaLabel: "Office Video",
    iconProps: { iconName: "OfficeVideoLogo" },
    href:
      "https://stream.microsoft.com"
  }
];

/* links for the MM Apps menu */
const pbApps = [
  {
    key: "product-development",
    name: "Product Development",
    ariaLabel: "Product Development",
    subMenuProps: {
      onItemClick,
      items: [
        {
          key: "cms",
          name: "CMS (Color)",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "devsheet",
          name: "DevSheet",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "oms",
          name: "Order Management System (OMS)",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "plm",
          name: "PLM",
          href:
            "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "storyboard",
          name: "Story Board",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  },
  {
    key: "facilities",
    name: "Facilities",
    ariaLabel: "Facilities",
    subMenuProps: {
      onItemClick,
      items: [
        {
          key: "floorplan",
          name: "Floor Plan",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "visitorlist",
          name: "Visitor List",
          href:
            "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  },
  {
    key: "finance",
    name: "Finance",
    ariaLabel: "Finance",
    subMenuProps: {
      onItemClick,
      items: [
        {
          key: "dailysales",
          name: "Daily Sales",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "mfa",
          name: "MFA",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "orv",
          name: "ORV",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "ra-request",
          name: "RA Request",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "weekly-sales-report",
          name: "Weekly Sales Report",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  },
  {
    key: "hr",
    name: "Human Resources",
    ariaLabel: "Human Resources",
    subMenuProps: {
      onItemClick,
      items: [
        {
          key: "candidate-referral-program",
          name: "Candidate Referral Program",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "mentor-program",
          name: "Mentor Program",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  },
  {
    key: "logistics",
    name: "Logistics",
    ariaLabel: "Logistics",
    subMenuProps: {
      onItemClick,
      items: [
        {
          key: "compliance",
          name: "Compliance",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "logistics-claims",
          name: "Logistics Claims",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "transit-calendar",
          name: "Transit Calendar",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "ticketing",
          name: "Ticketing",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  },
  {
    key: "overseas",
    name: "Overseas",
    ariaLabel: "Overseas",
    subMenuProps: {
      onItemClick,
      items: [
        {
          title: "Overseas CMS - Create/Update/Delete Events",
          key: "overseas-cms",
          name: "Overseas CMS",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "supplier-report-card",
          name: "Supplier Report Card",
          href:
            "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  },
  {
    key: "support",
    name: "Support",
    ariaLabel: "Support",
    subMenuProps: {
      onItemClick,
      items: [
        {
          key: "facilities-helpdesk",
          name: "Facilities Help Desk",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "production-services",
          name: "Production Services",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "first-choice",
          name: "First Choice",
          href: "#",
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  },
  {
    key: "training",
    name: "Training",
    ariaLabel: "Training",
    subMenuProps: {
      onItemClick,
      items: [
        {
          key: "adobe-training-knowledge-base",
          name: "Adobe Training Knowledge Base",
          href: `$#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "o365-center-of-excellence",
          name: "O365 Center of Excellence",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        },
        {
          key: "business-plan-guidelines",
          name: "Business Plan Guidelines",
          href: `#`,
          onClick(ev) {
            ev.preventDefault();
            window.open(this.href);
          }
        }
      ]
    }
  }
];

/* Items for Nav Panel */
export const NavDefinition = [
  {
    name: "All FOBs",
    links: allFOB
  }
];

/* Defines which item sets appear in the Command Bar (the Header) */
export const CommandBarDefinition = {
  items: [
    {
      key: "pbApps",
      name: "PB Apps",
      ariaLabel: "Private Brands Applications. Use up and down arrows to navigate",
      iconProps: { iconName: "FavoriteStarFill" },
      onClick(ev) {
        ev.preventDefault();
      },
      subMenuProps: {
        items: pbApps,
        isSubMenu: true,
        isBeakVisible: true
      }
    },
    {
      key: "o365Apps",
      name: "O365 Apps",
      ariaLabel: "Office 365 Applications. Use up and down arrows to navigate",
      iconProps: { iconName: "OfficeLogo" },
      onClick(ev) {
        ev.preventDefault();
      },
      subMenuProps: {
        items: o365Apps,
        isSubMenu: true,
        isBeakVisible: true
      }
    }
  ]
};

// Feedback Form Stuff
/* feedback type options */
export const feedbackTypeOptions = [
  { key: "Appreciation", text: "Appreciation" },
  { key: "Complaint", text: "Complaint" },
  { key: "Enhancement", text: "Enhancement" },
  { key: "Error", text: "Error" },
  { key: "General Question", text: "General Question" }
];

/* Business Area options */
export const businessAreaOptions = allFOB.map(function (item) {
  return {
    key: item.key,
    text: item.name
  };
});
