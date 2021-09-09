export class jogosComprados{
    private _nome:string
    private _nomeUsuario:string
    
    constructor(nome:string , nomeUsuario:string){
        this._nome = nome
        this._nomeUsuario = nomeUsuario
    }

    public getNome():string{
        return this._nome
    }

    public getNomeUsuario():string{
        return this._nomeUsuario
    }

    public setNome(nome:string):void{
        this._nome = nome
    }

    public setNomeUsuario(nome:string):void{
        this._nomeUsuario = nome
    }
}