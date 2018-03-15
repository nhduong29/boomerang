exports.isContain = function(args,productId){
    for( i = 0; i < args.length; i++){
        if ( args[i] == productId){
            return true;
        }
    }
    
    return false;
};