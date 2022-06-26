type LookedAfter = {
  InCare: boolean;
  CareAuthority: string;
};

const getCareAuthority = () => {
  if (Math.random() > 0.05) {
    return Math.floor(Math.random() * 940) + 1;
  }
  return Math.random() > 0.5 ? 'MMM' : 'XXX';
};

const create = () => {
  const InCare = Math.random() > 0.1;
  return {
    InCare,
    CareAuthority: InCare ? getCareAuthority() : undefined,
  };
};

export { LookedAfter, create };
