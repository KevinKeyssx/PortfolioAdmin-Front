import type { AnySkill }	from './skills';
import type { ILovVal }		from './lov-val';

export interface ILovParent<TSkill = AnySkill> {
	id			: number;
	description	: string;
	active		: boolean;
	skill		: TSkill;
	comment		: string | null;
	created_at	: string | null;
}

export interface ILovDetail<TSkill = AnySkill> extends ILovParent<TSkill> {
	lov_vals	: ILovVal<TSkill>[];
}

export interface ISaveLovPayload<TSkill = AnySkill> {
	description	: string;
	active		: boolean;
	skill?		: TSkill;
	comment?	: string | null;
}

export interface IUpdateLovPayload<TSkill = AnySkill> {
	description?	: string;
	active?			: boolean;
	skill?			: TSkill;
	comment?		: string | null;
}
