type Admissions = {
  Accepted: boolean;
};

const create = (): Admissions => ({ Accepted: Math.random() > 0.5 });

export { Admissions, create };
