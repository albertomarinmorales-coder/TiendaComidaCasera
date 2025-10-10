export type HeroProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
};

export interface NavbarLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}