<?php 
namespace Classes\Trait;

trait Debug
{
    /**
     * Affiche ce qui est fourni en argument de façon plus jolie
     *
     * @param any[] ...$values
     * @return void
     */
    public function dump(...$values)
    {
        // Paramètre du highlight_string
        ini_set("highlight.comment","#008000");
        ini_set("highlight.default","#000000");
        ini_set("highlight.html","#808080");
        ini_set("highlight.keyword","#0000BB; font-weight: bold");
        ini_set("highlight.string","#DD0000");
        // css de la balise pre 
        $style = 
        "background-color: #DDDDDD;
        color: white;
        width: fit-content;
        padding: 1rem;
        border: 2px solid green;
        margin: 1rem auto;";

        foreach($values as $v)
        {
            $varexport = var_export($v, true);
            $message = highlight_string("<?php \n $varexport \n?>",true);
            echo "<pre style='$style'>$message</pre>";
        }
    }
    /**
     * Affiche ce qui est fourni en argument puis "DIE"
     *
     * @param any[] ...$values
     * @return void
     */
    public function dieAndDump(...$values)
    {
        $this->dump(...$values);
        die;
    }
}