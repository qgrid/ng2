export class ThemeView{
	constructor(model){
		this.model=model;
	}

	get classList()
	{
		return this.model.style().classList;
	}
}



