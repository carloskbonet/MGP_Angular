export class jogo{
    private _nome:string
    private _descricao:string
    private _preco:number
    
    constructor(nome:string , descricao:string , preco:number){
        this._nome = nome
        this._descricao = descricao
        this._preco = preco
    }

    public getNome():string{
        return this._nome
    }

    public getDescricao():string{
        return this._descricao
    }

    public getPreco():number{
        return this._preco
    }

    public setNome(nome:string):void{
        this._nome = nome
    }

    public setDescricao(descricao:string):void{
        this._descricao = descricao
    }

    public setPreco(preco:number):void{
        this._preco = preco
    }
}