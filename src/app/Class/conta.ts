export class conta{
    private _nome:string
    private _apelido:string
    private _idade:number
    private _biografia:string
    
    constructor(nome:string , apelido:string , idade:number , biografia:string){
        this._nome = nome
        this._apelido = apelido
        this._idade = idade
        this._biografia = biografia
    }

    public getNome():string{
        return this._nome
    }

    public getApelido():string{
        return this._apelido
    }

    public getIdade():number{
        return this._idade
    }

    public getBiografia():string{
        return this._biografia
    }

    public setNome(__nome:string){
        this._nome = __nome
    }

    public setApelido(__apelido:string){
        this._apelido = __apelido
    }

    public setIdade(__idade:number){
        this._idade = __idade
    }

    public setBiografia(__biografia:string){
        this._biografia = __biografia
    }
}