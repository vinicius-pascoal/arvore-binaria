export class TreeNode {
  valor: number;
  esquerda: TreeNode | null = null;
  direita: TreeNode | null = null;
  altura: number = 1;

  constructor(valor: number) {
    this.valor = valor;
  }
}

export class AVLTree {
  raiz: TreeNode | null = null;

  altura(no: TreeNode | null): number {
    return no ? no.altura : 0;
  }

  fatorBalanceamento(no: TreeNode): number {
    return this.altura(no.esquerda) - this.altura(no.direita);
  }

  rotacaoDireita(y: TreeNode): TreeNode {
    const x = y.esquerda!;
    const T2 = x.direita;

    x.direita = y;
    y.esquerda = T2;

    y.altura = Math.max(this.altura(y.esquerda), this.altura(y.direita)) + 1;
    x.altura = Math.max(this.altura(x.esquerda), this.altura(x.direita)) + 1;

    return x;
  }

  rotacaoEsquerda(x: TreeNode): TreeNode {
    const y = x.direita!;
    const T2 = y.esquerda;

    y.esquerda = x;
    x.direita = T2;

    x.altura = Math.max(this.altura(x.esquerda), this.altura(x.direita)) + 1;
    y.altura = Math.max(this.altura(y.esquerda), this.altura(y.direita)) + 1;

    return y;
  }

  inserir(no: TreeNode | null, valor: number): TreeNode {
    if (!no) return new TreeNode(valor);

    if (valor < no.valor) {
      no.esquerda = this.inserir(no.esquerda, valor);
    } else if (valor > no.valor) {
      no.direita = this.inserir(no.direita, valor);
    } else {
      return no;
    }

    no.altura = Math.max(this.altura(no.esquerda), this.altura(no.direita)) + 1;

    const balance = this.fatorBalanceamento(no);

    if (balance > 1 && valor < (no.esquerda?.valor ?? 0)) return this.rotacaoDireita(no);
    if (balance < -1 && valor > (no.direita?.valor ?? 0)) return this.rotacaoEsquerda(no);
    if (balance > 1 && valor > (no.esquerda?.valor ?? 0)) {
      no.esquerda = this.rotacaoEsquerda(no.esquerda!);
      return this.rotacaoDireita(no);
    }
    if (balance < -1 && valor < (no.direita?.valor ?? 0)) {
      no.direita = this.rotacaoDireita(no.direita!);
      return this.rotacaoEsquerda(no);
    }

    return no;
  }

  //TODO testar e interar remover method
  remover(no: TreeNode | null, valor: number): TreeNode | null {
    if (!no) return no;

    if (valor < no.valor) {
      no.esquerda = this.remover(no.esquerda, valor);
    } else if (valor > no.valor) {
      no.direita = this.remover(no.direita, valor);
    } else {
      if (!no.esquerda || !no.direita) {
        return no.esquerda ? no.esquerda : no.direita;
      }
      const temp = this.minimo(no.direita);
      no.valor = temp.valor;
      no.direita = this.remover(no.direita, temp.valor);
    }

    if (!no) return no;

    no.altura = Math.max(this.altura(no.esquerda), this.altura(no.direita)) + 1;

    const balance = this.fatorBalanceamento(no);

    if (balance > 1 && this.fatorBalanceamento(no.esquerda!) >= 0) return this.rotacaoDireita(no);
    if (balance < -1 && this.fatorBalanceamento(no.direita!) <= 0) return this.rotacaoEsquerda(no);
    if (balance > 1 && this.fatorBalanceamento(no.esquerda!) < 0) {
      no.esquerda = this.rotacaoEsquerda(no.esquerda!);
      return this.rotacaoDireita(no);
    }
    if (balance < -1 && this.fatorBalanceamento(no.direita!) > 0) {
      no.direita = this.rotacaoDireita(no.direita!);
      return this.rotacaoEsquerda(no);
    }

    return no;
  }

  minimo(no: TreeNode): TreeNode {
    let atual = no;
    while (atual.esquerda) {
      atual = atual.esquerda;
    }
    return atual;
  }

  // TODO testar buscar method
  buscar(no: TreeNode | null, valor: number): TreeNode | null {
    if (!no || no.valor === valor) return no;
    if (valor < no.valor) return this.buscar(no.esquerda, valor);
    return this.buscar(no.direita, valor);
  }

  removerValor(valor: number) {
    this.raiz = this.remover(this.raiz, valor);
  }

  inserirValor(valor: number) {
    this.raiz = this.inserir(this.raiz, valor);
  }

  inorder(no: TreeNode | null = this.raiz): number[] {
    if (!no) return [];
    return [...this.inorder(no.esquerda), no.valor, ...this.inorder(no.direita)];
  }

  preorder(no: TreeNode | null = this.raiz): number[] {
    if (!no) return [];
    return [no.valor, ...this.preorder(no.esquerda), ...this.preorder(no.direita)];
  }

  postorder(no: TreeNode | null = this.raiz): number[] {
    if (!no) return [];
    return [...this.postorder(no.esquerda), ...this.postorder(no.direita), no.valor];
  }
}
