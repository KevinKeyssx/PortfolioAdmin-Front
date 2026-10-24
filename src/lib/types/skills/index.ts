export * from './about';
export * from './education';
export * from './employment';
export * from './tech-skills';
export * from './other-skills';
export * from './certificates';
export * from './portfolio';

import type { AboutSkill }			from './about';
import type { EducationSkill }		from './education';
import type { EmploymentSkill }		from './employment';
import type { TechSkill }			from './tech-skills';
import type { OtherSkill }			from './other-skills';
import type { CertificateSkill }	from './certificates';
import type { PortfolioSkill }		from './portfolio';

export type AnySkill =
	| AboutSkill
	| EducationSkill
	| EmploymentSkill
	| TechSkill
	| OtherSkill
	| CertificateSkill
	| PortfolioSkill
	| Record<string, unknown>
	| null;
