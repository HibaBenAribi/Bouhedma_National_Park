# WWF TALENT ACADEMY 2026 – SÉRIE BIODIVERSITÉ
## ÉDITION 3 — BOUHEDMA
### Suivi de la biodiversité & conflits homme-faune · 14–19 septembre 2026
**COMMUN** · BHD26-COM-CODE · Version 1.0 — 09/2026

---

# GUIDE DES CODES & DICTIONNAIRE DE DONNÉES
**Vocabulaires contrôlés, standards de saisie et règles de nommage applicables à l'ensemble des travaux pratiques de l'Édition 3.**
*À CONSERVER DANS LE PORTE-BLOC PENDANT TOUTE LA SEMAINE*

---

## POURQUOI UN VOCABULAIRE CONTRÔLÉ
Trente participants, treize sessions pratiques, six jours : sans vocabulaire commun, le jeu de données final contiendra « chacal », « Chacal doré », « C. aureus » et « chacal ? » pour une même espèce, et deviendra inexploitable. **N'inventez jamais un code sur le terrain** : si le code manque, écrivez le nom complet en toutes lettres et signalez-le au responsable données le soir.

---

## 01 · RÈGLES GÉNÉRALES DE SAISIE

| Règle | Application |
| :--- | :--- |
| **Une ligne = une observation** | Jamais deux espèces sur la même ligne, jamais « 3 gazelles + 1 oryx » dans une case. |
| **Jamais de case vide** | Écrire **NA** (non applicable) ou **ND** (non déterminé). Une case vide est indistinguable d'un oubli. |
| **Pas d'unité dans la cellule** | « 42 » et non « 42 m ». L'unité est dans l'en-tête de colonne. |
| **Décimale = point** | 34.47512 et non 34,47512 — la virgule casse les fichiers CSV. |
| **Pas de couleur porteuse de sens** | Une case surlignée ne se transmet pas. L'information va dans une colonne. |
| **Zéro $\neq$ vide** | « 0 » signifie « recherché et non trouvé ». C'est une donnée précieuse. |
| **Crayon 2H** | Le stylo bave à la sueur et à la rosée. Le crayon se corrige et résiste. |
| **Remplir sur place** | Une fiche remplie de mémoire au camp le soir est une fiche fausse. |

### Dates, heures, coordonnées

| Champ | Format imposé |
| :--- | :--- |
| **Date** | **AAAA-MM-JJ** — ex. 2026-09-16 (ISO 8601). Jamais 16/09/26. |
| **Heure** | **HH:MM** sur 24 h — ex. 19:45. Fuseau : **UTC+1** (heure locale tunisienne), constant toute la semaine. |
| **Latitude / longitude** | **Degrés décimaux, WGS 84, 5 décimales** — ex. 34.47512 / 9.51038. 5 décimales = 1 m. Ne jamais mélanger avec les degrés-minutes-secondes. |
| **Précision GPS** | En mètres, telle qu'affichée par l'appareil au moment du relevé — ex. 4. |
| **Altitude** | En mètres, entier. Source : GPS (peu précise en Z, à noter comme telle). |
| **Waypoint** | Nom identique à l'identifiant de l'unité d'échantillonnage — ex. BHD26_CT03. |

> **LE GPS DU PARC EST EN DEGRÉS-MINUTES ?**
> Avant la première session, régler **tous** les appareils sur *hddd.ddddd°* et sur le datum **WGS 84**, puis vérifier appareil par appareil.

---

## 02 · VOCABULAIRES CONTRÔLÉS

Chaque vocabulaire est indépendant : un même code peut exister dans deux vocabulaires différents sans ambiguïté, puisque la colonne de la fiche indique lequel s'applique.

### V1 · Habitat

| Code | Habitat |
| :--- | :--- |
| **SAV** | Savane à *Vachellia tortilis* (plaine) |
| **STA** | Steppe à alfa (*Stipa tenacissima*) |
| **STC** | Steppe à chaméphytes (armoise, *Gymnocarpos*) |
| **JEB** | Versant rocheux du jebel, matorral |
| **OUE** | Lit d'oued, ripisylve |
| **GLA** | Glacis, reg caillouteux |
| **SAB** | Placage sableux, nebka |
| **HAL** | Zone salée, végétation halophile |
| **ENC** | Enclos de réintroduction |
| **PTE** | Point d'eau, abreuvoir |
| **CUL** | Culture, jardin, meule |
| **BAT** | Bâti, campement, infrastructure |
| **PIS** | Piste, route |

### V2 · Substrat

| Code | Substrat |
| :--- | :--- |
| **SAB** | Sable meuble |
| **LIM** | Limon, sol fin battant |
| **GRV** | Gravier, reg |
| **ROC** | Dalle ou blocs rocheux |
| **GYP** | Croûte gypseuse ou calcaire |
| **ARG** | Argile, sol craquelé |
| **LIT** | Litière végétale |

### V3 · Type d'indice

| Code | Indice |
| :--- | :--- |
| **VIS** | Animal vu |
| **AUD** | Animal entendu |
| **EMP** | Empreinte |
| **FEC** | Fèces, crotte |
| **LAT** | Latrine |
| **TER** | Terrier, gîte |
| **GRT** | Grattage, fouissement |
| **POI** | Poils |
| **PLU** | Plumes |
| **OSS** | Ossements, reste de repas |
| **CAD** | Cadavre |
| **PEL** | Pelote de réjection |
| **MUE** | Mue (reptile) |
| **PHO** | Photo de piège photographique |

### V7 · Interaction homme-faune

| Code | Type d'interaction relevée |
| :--- | :--- |
| **PRE** | Prédation sur cheptel domestique |
| **DEG** | Dégât sur culture ou verger |
| **PAT** | Pâturage de cheptel dans la zone protégée |
| **COU** | Coupe de bois, prélèvement de ligneux |
| **PIE** | Piège, collet, lacet |
| **TIR** | Indice de tir (douille, affût) |
| **CHI** | Chien errant ou de troupeau |
| **DEC** | Déchets, décharge sauvage |
| **VEH** | Circulation de véhicule hors piste |
| **MOR** | Mortalité d'origine anthropique |

*Tout indice codé PIE, TIR ou MOR est signalé le soir même au conservateur du parc. Ce n'est pas une donnée d'exercice.*

---

## 03 · STRUCTURE DES JEUX DE DONNÉES — MODÈLE « ÉVÉNEMENT / OCCURRENCE »

Toutes les fiches de l'Édition 3 se transposent dans deux tables reliées, conformes au standard **Darwin Core** utilisé par le GBIF. C'est l'exercice de l'atelier **J4-S2 · Structuration des données**.

### Table 1 — ÉVÉNEMENT (l'effort)
*Une ligne par unité d'échantillonnage : une station-nuit, un point d'écoute, un transect parcouru, un quadrat relevé.*
* `eventID`
* `eventDate`
* `eventTime`
* `samplingProtocol`
* `sampleSizeValue`
* `sampleSizeUnit`
* `decimalLatitude`
* `decimalLongitude`
* `coordinateUncertaintyInMeters`
* `geodeticDatum`
* `locality`
* `habitat`
* `recordedBy`
* `equipe`

### Table 2 — OCCURRENCE (ce qui a été observé)
*Une ligne par observation, rattachée à un eventID.*
* `occurrenceID`
* `eventID`
* `scientificName`
* `vernacularName`
* `codeEspece`
* `individualCount`
* `sex`
* `lifeStage`
* `basisOfRecord`
* `identificationQualifier`
* `identifiedBy`
* `associatedMedia`
* `occurrenceRemarks`

---

## 04 · VOCABULAIRES CONTRÔLÉS (SUITE)

### V4 · Âge et sexe

| Code | Signification |
| :--- | :--- |
| **M / F / I** | Mâle / femelle / sexe indéterminé |
| **AD** | Adulte |
| **SA** | Subadulte |
| **JU** | Juvénile |
| **JA** | Jeune de l'année |
| **IND** | Âge indéterminé |

### V5 · Fiabilité de l'identification

| Code | Signification |
| :--- | :--- |
| **1** | **Certaine** — critères diagnostiques vus, aucune espèce confusible |
| **2** | **Probable** — cohérente, mais un critère manque |
| **3** | **Possible** — plusieurs espèces restent compatibles |

*Descendre au genre (Gerbillus sp.) est toujours préférable à une espèce inventée. Un « 3 » honnête vaut mieux qu'un « 1 » faux : la donnée reste utilisable.*

### V6 · Conditions météo

| Champ | Codage |
| :--- | :--- |
| **Couverture nuageuse** | En octas, 0 à 8 |
| **Vent** | Beaufort 0 à 12 |
| **Pluie** | 0 : nulle · 1 : bruine · 2 : averse |
| **Température** | °C, entier |
| **Lune** | NL · PQ · PL · DQ (nouvelle, premier quartier, pleine, dernier quartier) |

*La météo se relève au début et à la fin de chaque unité d'échantillonnage, pas une seule fois pour la journée : la détectabilité des oiseaux, des chiroptères et des insectes y est directement liée.*

---

## 05 · NOMMAGE DES IDENTIFIANTS ET DES FICHIERS

| Objet | Gabarit et exemple |
| :--- | :--- |
| **Station piège photo** | `BHD26_CT01` ... `CT04` |
| **Point d'écoute / d'enregistrement** | `BHD26_AC01` ... (acoustique) |
| **Transect** | `BHD26_TR01` ... `TR04` |
| **Quadrat sur transect** | `BHD26_TR02_Q3` (3ᵉ quadrat du transect 2) |
| **Station de piégeage lumineux** | `BHD26_LT01`, `LT02` |
| **Relevé botanique** | `BHD26_RB01` ... |
| **Part d'herbier** | `BHD26_H001` ... numérotation continue |
| **Échantillon (fèces, insecte, tique)** | `BHD26_E001` ... numérotation continue |
| **Équipe** | A, B, C, D |
| **Observateur** | Initiales sur 3 lettres, uniques — ex. ZBO. Table d'attribution tenue au camp. |

| Fichier | Gabarit et exemple |
| :--- | :--- |
| **Saisie d'une session** | `BHD26_J3S1_SAISIE_2026-09-16.csv` |
| **Photos d'une station** | Dossier `BHD26_CT01_2026-09-19/` |
| **Enregistrements audio** | Dossier `BHD26_AC01_2026-09-15/` |
| **Scan de fiche papier** | `BHD26_J3S1_FT01_CT02_scan.jpg` |

> **TROIS INTERDITS SUR LES NOMS DE FICHIERS**
> Pas d'espace (utiliser `_`) · pas d'accent ni de caractère spécial · pas de date en JJ-MM-AAAA. Les fichiers originaux (photos, sons) ne sont **jamais renommés, recadrés ni retouchés** : on travaille toujours sur une copie.

---

### LA RÈGLE QUI RÉSUME TOUT
L'effort se note même quand il n'y a rien à voir. Une station-nuit sans détection, un transect sans oiseau, un quadrat sans espèce : ce sont des lignes de la table événement avec zéro occurrence associée. Sans elles, on ne peut calculer ni fréquence, ni densité, ni probabilité de détection — et l'ensemble du travail de la semaine perd sa valeur analytique.

---

## 06 · CODES ESPÈCES — MAMMIFÈRES

Code alpha à 4 lettres : deux premières lettres du genre + deux premières de l'épithète spécifique (*Oryx dammah* $\rightarrow$ `ORDA`). Une espèce absente de cette liste s'écrit en toutes lettres sur la fiche ; le code sera attribué au camp le soir. Le statut « Liste rouge UICN » est indicatif et doit être vérifié à la date d'usage.

### Mammifères terrestres (sp.)

| Code | Nom scientifique | Nom français | Note |
| :--- | :--- | :--- | :--- |
| **ORDA** | *Oryx dammah* | Oryx algazelle | Réintroduit 1985 · enclos |
| **ADNA** | *Addax nasomaculatus* | Addax | Réintroduit · enclos |
| **NADA** | *Nanger dama mhorr* | Gazelle dama mhorr | Réintroduite années 1990 |
| **GADO** | *Gazella dorcas* | Gazelle dorcas | Population libre |
| **AMLE** | *Ammotragus lervia* | Mouflon à manchettes | Jebel |
| **HYHY** | *Hyaena hyaena* | Hyène rayée | Données sensibles |
| **CAAU** | *Canis aureus* | Chacal doré | Conflit avec l'élevage |
| **CACA** | *Caracal caracal* | Caracal | Rare, discret |
| **FELY** | *Felis lybica* | Chat ganté | Hybridation possible |
| **VURU** | *Vulpes rueppellii* | Renard famélique | Secteurs sableux |
| **VUVU** | *Vulpes vulpes* | Renard roux | Ubiquiste |
| **HEIC** | *Herpestes ichneumon* | Mangouste ichneumon | Diurne |
| **GEGE** | *Genetta genetta* | Genette commune | À confirmer localement |
| **HYCR** | *Hystrix cristata* | Porc-épic à crête | Piquants au sol |
| **LECA** | *Lepus capensis* | Lièvre du Cap | Commun |
| **CTGU** | *Ctenodactylus gundi* | Goundi de l'Atlas | Rochers du jebel |
| **JAJA** | *Jaculus jaculus* | Petite gerboise d'Égypte | Nocturne |
| **PSOB** | *Psammomys obesus* | Rat des sables | Diurne, sur salsolacées |
| **MESH** | *Meriones shawii* | Mérione de Shaw | Colonies fouisseuses |
| **GERSP**| *Gerbillus* sp. | Gerbille | Genre — détermination en main |
| **ATAL** | *Atelerix algirus* | Hérisson d'Algérie | Nocturne |
| **PAAE** | *Paraechinus aethiopicus* | Hérisson du désert | Nocturne |

### Chiroptères — codes de travail

| Code | Nom scientifique | Nom français |
| :--- | :--- | :--- |
| **RHCY** | *Rhinopoma cystops* | Rhinopome d'Égypte |
| **ASTR** | *Asellia tridens* | Asellie tridente |
| **TANU** | *Taphozous nudiventris* | Taphien à ventre nu |
| **OTHE** | *Otonycteris hemprichii* | Oreillard de Hemprich |
| **PIKU** | *Pipistrellus kuhlii* | Pipistrelle de Kuhl |
| **PIRU** | *Pipistrellus rueppellii* | Pipistrelle de Rüppell |
| **HYSA** | *Hypsugo savii* | Vespère de Savi |
| **EPIS** | *Eptesicus isabellinus* | Sérotine isabelle |
| **PLGA** | *Plecotus gaisleri* | Oreillard du Maghreb |
| **TATE** | *Tadarida teniotis* | Molosse de Cestoni |
| **RHHI** | *Rhinolophus hipposideros* | Petit rhinolophe |
| **NYTH** | *Nycteris thebaica* | Nyctère de la Thébaïde |
| **CHISP**| *Chiroptère non déterminé* | Code par défaut |

> **CHAUVES-SOURIS : LE CODE PAR DÉFAUT EST LA RÈGLE**
> Aucune identification spécifique de chiroptère n'est validée sur le terrain à partir d'une seule écoute. Sur la fiche, on note **CHISP** plus les caractéristiques mesurées (fréquence de plus forte énergie, structure du signal, durée, rythme). L'attribution spécifique est faite après coup par l'animateur sur le sonagramme, avec la bibliothèque de référence régionale. Cette liste sert à lire les résultats, **pas à identifier à l'oreille**.

> **ESPÈCES À DONNÉES SENSIBLES**
> Hyène rayée, caracal, mouflon à manchettes, et tout indice de braconnage : les coordonnées ne sont pas diffusées publiquement et ne sont pas publiées sur les réseaux sociaux ni sur les plateformes participatives. Elles remontent au conservateur du parc.

---

## 07 · OISEAUX — ESPÈCES ATTENDUES EN SEPTEMBRE

Liste de travail non exhaustive, centrée sur les espèces sédentaires et les migrateurs postnuptiaux de la mi-septembre. Toute espèce hors liste s'écrit en toutes lettres.

| Code | Nom scientifique | Nom français | Code | Nom scientifique | Nom français |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **STCA** | *Struthio camelus* | Autruche (réintroduite, enclos) | **GACR** | *Galerida cristata* | Cochevis huppé |
| **AQFA** | *Aquila fasciata* | Aigle de Bonelli | **GATH** | *Galerida theklae* | Cochevis de Thékla |
| **NEPE** | *Neophron percnopterus* | Vautour percnoptère | **AMDE** | *Ammomanes deserti* | Ammomane isabelline |
| **FATI** | *Falco tinnunculus* | Faucon crécerelle | **OELE** | *Oenanthe leucura* | Traquet rieur |
| **BUAS** | *Bubo ascalaphus* | Grand-duc ascalaphe | **OEDE** | *Oenanthe deserti* | Traquet du désert |
| **ATNO** | *Athene noctua* | Chevêche d'Athéna | **LAME** | *Lanius meridionalis* | Pie-grièche méridionale |
| **ALBA** | *Alectoris barbara* | Perdrix gambra | **BUGI** | *Bucanetes githagineus* | Roselin githagine |
| **PTAL** | *Pterocles alchata* | Ganga cata | **EMSA** | *Emberiza sahari* | Bruant du Sahara |
| **CUCU** | *Cursorius cursor* | Courvite isabelle | **COLI** | *Columba livia* | Pigeon biset |
| **CORU** | *Corvus ruficollis* | Corbeau brun | **AVISP**| *Oiseau non déterminé* | Code par défaut |

---

## 08 · REPTILES ET AMPHIBIEN

| Code | Nom scientifique | Nom français | Note |
| :--- | :--- | :--- | :--- |
| **VAGR** | *Varanus griseus* | Varan du désert | CITES An. I |
| **URAC** | *Uromastyx acanthinura* | Fouette-queue | CITES An. II |
| **TEGR** | *Testudo graeca* | Tortue grecque | CITES An. II |
| **CHCH** | *Chamaeleo chamaeleon* | Caméléon commun | CITES An. II |
| **CECE** | *Cerastes cerastes* | Vipère à cornes | Venimeuse |
| **CEVI** | *Cerastes vipera* | Vipère des sables | Venimeuse |
| **DADE** | *Daboia deserti* | Vipère du désert | Venimeuse |

| Code (sp. sp.) | Nom scientifique | Nom français | Note |
| :--- | :--- | :--- | :--- |
| **MAIN** | *Malpolon insignitus* | Couleuvre de Montpellier | Opisthoglyphe |
| **PSSC** | *Psammophis schokari* | Couleuvre schokari | Opisthoglyphe |
| **AGIM** | *Agama impalearis* | Agame de Bibron | Rochers |
| **ACASP**| *Acanthodactylus* | Acanthodactyle | Genre — écailles requises |
| **MESSP**| *Mesalina* | Mésaline | Genre |
| **CHOC** | *Chalcides ocellatus* | Seps ocellé | — |
| **PESA** | *Pelophylax saharicus* | Grenouille saharienne | Points d'eau |

> **MANIPULATION**
> **Aucun serpent n'est manipulé pendant l'Academy**, venimeux ou non. Observation, photo, mesure à distance. Les espèces inscrites à la CITES ne sont ni capturées, ni collectées, ni déplacées : la détention et le transport sont soumis à autorisation de la DGF, point focal CITES.

---

## 09 · FLORE — ESPÈCES STRUCTURANTES DE BOUHEDMA

Nomenclature à vérifier contre le *Catalogue synonymique commenté de la flore de Tunisie* (Le Floc'h, Boulos & Véla, 2010) et POWO. Les synonymes courants sont indiqués.

### subsp. raddiana var. sylvestris

| Code | Nom scientifique | Type / zone |
| :--- | :--- | :--- |
| **VATO** | *Vachellia tortilis* | Arbre — savane (protégé) |
| **RHTR** | *Rhus tripartita* | Arbuste — glacis, jebel |
| **PEAN** | *Periploca angustifolia* | Arbuste — steppe |
| **ZILO** | *Ziziphus lotus* | Arbuste — plaine |
| **RERA** | *Retama raetam* | Arbuste — sables, oueds |
| **PIAT** | *Pistacia atlantica* | Arbre — oued, jebel |
| **OLEU** | *Olea europaea* | Arbre — jebel |
| **JUPH** | *Juniperus phoenicea* | Arbre — versants du jebel |
| **STTE** | *Stipa tenacissima* | Graminée — steppe à alfa |
| **LYSP** | *Lygeum spartum* | Graminée — sols salés |
| **STPU** | *Stipagrostis pungens* | Graminée — sables |
| **CECI** | *Cenchrus ciliaris* | Graminée — sous-couvert d'acacia |

### (Hammada) (Pituranthos)

| Code | Nom scientifique | Type / zone |
| :--- | :--- | :--- |
| **ARHE** | *Artemisia herba-alba* | Chaméphyte — steppe |
| **ARCA** | *Artemisia campestris* | Chaméphyte — sables |
| **GYDE** | *Gymnocarpos decander* | Chaméphyte — glacis |
| **ANHE** | *Anthyllis henoniana* | Chaméphyte — steppe |
| **HEKA** | *Helianthemum kahiricum* | Chaméphyte — glacis |
| **ASAR** | *Astragalus armatus* | Chaméphyte épineux — surpâturage |
| **THHI** | *Thymelaea hirsuta* | Chaméphyte — dégradation |
| **ATHA** | *Atriplex halimus* | Halophyte |
| **SAVE** | *Salsola vermiculata* | Halophyte |
| **HASO** | *Haloxylon scoparium* | Halophyte — reg |
| **LIGU** | *Limoniastrum guyonianum* | Halophyte — sols gypseux |
| **NIRE** | *Nitraria retusa* | Halophyte — nebkas |
| **DETO** | *Deverra tortuosa* | Chaméphyte — oueds |
| **CASP** | *Capparis spinosa* | Arbuste — rochers |

---

## 10 · OÙ VA LA DONNÉE APRÈS LA SEMAINE

1. **Fiche papier** remplie sur le terrain, contresignée par le contrôleur qualité.
2. **Fiche photographiée** le soir même (sauvegarde immédiate, avant toute saisie).
3. **Saisie dans le modèle CSV** de la session, par le binôme de saisie de l'équipe.
4. **Vérification croisée** : la saisie est relue par une autre équipe que celle qui a collecté.
5. **Consolidation** dans les tables Événement / Occurrence (atelier J4-S2).
6. **Remise au conservateur** du PN de Bouhedma et à la DGF, propriétaires des données.

> **PROPRIÉTÉ ET DIFFUSION**
> Les données collectées dans une aire protégée appartiennent au gestionnaire de l'aire protégée. Aucun participant ne publie, ne diffuse ni ne dépose sur une plateforme participative les données de la semaine sans l'accord écrit du conservateur du parc et de la DGF. Les photographies personnelles restent la propriété de leur auteur, mais les localisations des espèces sensibles ne sont jamais diffusées avec elles.

---

*Document commun de la WWF Talent Academy 2026 – Édition 3, Parc national de Bouhedma, 14–19 septembre 2026. WWF Afrique du Nord · GIZ Tunisie · Direction générale des forêts. Contact : iferjani@wwfna.org · zbouragaoui@wwfna.org*
*© 1986 Panda Symbol WWF – World Wide Fund for Nature. ® « WWF » est une marque déposée de WWF.*