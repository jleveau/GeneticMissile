function DNA(n, genes = []) {
    this.genes = genes;

    if (this.genes.length == 0){
        for (var i = 0; i < n; i++){
            var gene = p5.Vector.random2D();
            gene.setMag(0.1);
            this.genes.push(gene);
        }
    }

    this.getVector = function(i){
        return this.genes[i];
    };

    this.crossover = function(partner_dna){
        var new_genes = [];
        var mid = this.genes.length/2;
        var i ;
        for ( i = 0; i < mid; i++){
            new_genes[i] = this.genes[i].copy();
        }
        for (; i < this.genes.length; i++){
            new_genes[i] = partner_dna.genes[i].copy();
        }
        var child =  new DNA(new_genes.length, new_genes, MUTATION_RATE);
        child.mutate();
        return child;
    };

    this.mutate = function(){
        for(var i = 0; i < this.genes.length; ++i){
            if (random(1) < MUTATION_RATE){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.1);
            }
        }
    }

}