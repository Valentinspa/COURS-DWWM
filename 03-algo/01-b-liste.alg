<?xml version="1.0" encoding="UTF-8"?>
<Algo>
    <description texte="" courant="AFFICHER trucs[i]"/>
    <extension extnom="inactif"/>
    <fonction fctcode="" fctetat="inactif"/>
    <F2 F2para="" F2etat="inactif" F2defaut="" F2lignes=""/>
    <repere repetat="inactif" repcode="-10#10#-10#10#2#2"/>
    <param maxBoucle="500000" nbDecimales="8" epaisseurLigne="2" epaisseurPoint="2" totalBoucles="5000000" totalAffichages="1000" arrondiAuto="vrai"/>
    <item code="200#declarationfonctions" algoitem="FONCTIONS_UTILISEES"/>
    <item code="100#declarationsvariables" algoitem="VARIABLES">
        <item code="1#LISTE#trucs" algoitem="trucs EST_DU_TYPE LISTE"/>
        <item code="1#NOMBRE#i" algoitem="i EST_DU_TYPE NOMBRE"/>
    </item>
    <item code="101#debutalgo" algoitem="DEBUT_ALGORITHME">
        <item code="5#trucs#42#0" algoitem="trucs[0] PREND_LA_VALEUR 42"/>
        <item code="5#trucs#91#1" algoitem="trucs[1] PREND_LA_VALEUR 91"/>
        <item code="5#trucs#101#2" algoitem="trucs[2] PREND_LA_VALEUR 101"/>
        <item code="3#trucs#1#1" algoitem="AFFICHER trucs[1]"/>
        <item code="5#i#2#pasliste" algoitem="i PREND_LA_VALEUR 2"/>
        <item code="3#trucs#1#i" algoitem="AFFICHER trucs[i]"/>
    </item>
    <item code="102#finalgo" algoitem="FIN_ALGORITHME"/>
</Algo>
