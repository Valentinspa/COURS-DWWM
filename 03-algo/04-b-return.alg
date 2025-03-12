<?xml version="1.0" encoding="UTF-8"?>
<Algo>
    <description texte="" courant="AFFICHER c"/>
    <extension extnom="inactif"/>
    <fonction fctcode="" fctetat="inactif"/>
    <F2 F2para="" F2etat="inactif" F2defaut="" F2lignes=""/>
    <repere repetat="inactif" repcode="-10#10#-10#10#2#2"/>
    <param maxBoucle="500000" nbDecimales="8" epaisseurLigne="2" epaisseurPoint="2" totalBoucles="5000000" totalAffichages="1000" arrondiAuto="vrai"/>
    <item code="200#declarationfonctions" algoitem="FONCTIONS_UTILISEES">
        <item code="201#addition#x,y" algoitem="FONCTION addition(x,y)">
            <item code="202#declarationsvariablesfonction" algoitem="VARIABLES_FONCTION">
                <item code="1#NOMBRE#total" algoitem="total EST_DU_TYPE NOMBRE"/>
            </item>
            <item code="203#debutfonction" algoitem="DEBUT_FONCTION"/>
            <item code="5#total#x + y#pasliste" algoitem="total PREND_LA_VALEUR x + y"/>
            <item code="205#total" algoitem="RENVOYER total"/>
            <item code="204#finfonction" algoitem="FIN_FONCTION"/>
        </item>
    </item>
    <item code="100#declarationsvariables" algoitem="VARIABLES">
        <item code="1#NOMBRE#a" algoitem="a EST_DU_TYPE NOMBRE"/>
        <item code="1#NOMBRE#b" algoitem="b EST_DU_TYPE NOMBRE"/>
        <item code="1#NOMBRE#c" algoitem="c EST_DU_TYPE NOMBRE"/>
    </item>
    <item code="101#debutalgo" algoitem="DEBUT_ALGORITHME">
        <item code="4#Un nombre s'il vous plaît ?#1" algoitem="AFFICHER &quot;Un nombre s'il vous plaît ?&quot;"/>
        <item code="2#a#pasliste" algoitem="LIRE a"/>
        <item code="4#Un second ?#1" algoitem="AFFICHER &quot;Un second ?&quot;"/>
        <item code="2#b#pasliste" algoitem="LIRE b"/>
        <item code="20#addition(a,b)#1" algoitem="AFFICHERCALCUL addition(a,b)"/>
        <item code="20#sqrt(addition(a,b))#1" algoitem="AFFICHERCALCUL sqrt(addition(a,b))"/>
        <item code="5#c#addition(a,b)#pasliste" algoitem="c PREND_LA_VALEUR addition(a,b)"/>
        <item code="3#c#1#pasliste" algoitem="AFFICHER c"/>
    </item>
    <item code="102#finalgo" algoitem="FIN_ALGORITHME"/>
</Algo>
