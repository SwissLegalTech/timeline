<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Headers: content-type');
include "vendor\autoload.php";

// NER
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$text = $request->text;
$ner = new \StanfordTagger\CRFClassifier();
$ner->setOutputFormat(StanfordTagger\StanfordTagger::OUTPUT_FORMAT_XML);
$result = '<?xml version="1.0" encoding="ISO-8859-1"?>'.'<result>'.$ner->tag($text).'</result>';

$xml= simplexml_load_string($result) or die("Error: Cannot create object");
$result_json = [];
$value_old = null;
$i = 0;

foreach($xml->wi as $item) {
    if ($value_old == (string) $item[0]->attributes()->entity) {
        // Zu bestehenden hinzufügen
        if((string) $item[0]->attributes()->entity !== 'O') {
            $result_json [$i - 1]['name'] .= ' '. (string) $item[0];
        }
    } else {
        // Neuen Eintrag erstellen
        if((string) $item[0]->attributes()->entity !== 'O') {
            $result_json [] = [
                'name' => (string) $item[0],
                'type' => (string) $item[0]->attributes()->entity,
                'tag' => null
            ];
            $i++;
        }
    }

    // vorherigen Wert merken
    $value_old = (string) $item[0]->attributes()->entity;
}

echo json_encode($result_json);
?>