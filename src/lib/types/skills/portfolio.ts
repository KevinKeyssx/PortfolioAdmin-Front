export const PORTFOLIO_STATUS = [ 'In Prod', 'In Dev', 'Beta' ] as const;
export type PortfolioStatusType = ( typeof PORTFOLIO_STATUS )[ number ];

export const GITHUB_STACK = [ 'Frontend', 'Backend' ] as const;
export type GithubStackType = ( typeof GITHUB_STACK )[ number ];

export interface PortfolioGithub {
	url		: string;
	stack	: GithubStackType;
}

export interface PortfolioSkill {
	img				: string;
	url				: string;
	github			: PortfolioGithub[];
	status			: PortfolioStatusType;
	technologies	: string[];
}
