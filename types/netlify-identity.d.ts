interface NetlifyIdentityUser {
  id?: string;
  email?: string;
  confirmed_at?: string;
  app_metadata?: {
    provider?: string;
    roles?: string[];
  };
}

interface NetlifyIdentity {
  on: (event: "init" | "login" | "logout" | "error", cb: (user?: NetlifyIdentityUser) => void) => void;
  open: () => void;
  close: () => void;
  logout: () => void;
  currentUser: () => NetlifyIdentityUser | null;
}

interface Window {
  netlifyIdentity?: NetlifyIdentity;
}
