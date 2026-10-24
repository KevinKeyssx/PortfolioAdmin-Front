import type { AnySkill }	from './skills';
import type { ILovParent }	from './lov';

export interface ILovVal<TSkill = AnySkill> {
	id			: number;
	lov_id		: number;
	description	: string;
	active		: boolean;
	skill		: TSkill;
	comment		: string | null;
	created_at	: string | null;
}

export interface ILovValWithParent<TSkill = AnySkill> extends ILovVal<TSkill> {
	lov	: ILovParent;
}

export interface ISaveLovValPayload<TSkill = AnySkill> {
	lov_id		: number;
	description	: string;
	active		: boolean;
	skill?		: TSkill;
	comment?	: string | null;
}

export interface IUpdateLovValPayload<TSkill = AnySkill> {
	description?	: string;
	active?			: boolean;
	skill?			: TSkill;
	comment?		: string | null;
}
