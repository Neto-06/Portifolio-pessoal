<?php
// Importar as classes do PHPMailer com namespaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluir os arquivos necessários (ajuste o caminho conforme seu projeto)
require_once __DIR__ . '/src/Exception.php';
require_once __DIR__ . '/src/PHPMailer.php';
require_once __DIR__ . '/src/SMTP.php';

class Mail
{

    public $mailer;
    public $email = 'pedrobarbuglioneto999@gmail.com'; // Seu email
    public $senha = 'notezyowaqzdvvdd'; // Sua senha

    public function __construct(array $parametros)
    {
        $this->mailer = new PHPMailer(true); // true para habilitar exceções

        try {
            // Configurações SMTP
            $this->mailer->isSMTP();
            $this->mailer->Host = 'smtp.gmail.com';
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = $this->email;
            $this->mailer->Password = $this->senha;
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // ssl
            $this->mailer->Port = 465;

            // Remetente e destinatário
            $this->mailer->setFrom($this->email, 'Site');
            $this->addAddress($this->email, 'Administrador');

            // Conteúdo do email
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'Nova mensagem do site!';

            $body = '';
            foreach ($parametros as $key => $value) {
                if ($key === 'acao')
                    continue; // ignora o botão
                $body .= ucfirst($key) . ": " . htmlspecialchars($value) . "<br>";
            }
            $this->mailer->Body = $body;

        } catch (Exception $e) {
            echo "Erro ao configurar email: {$e->getMessage()}";
        }
    }

    public function addAddress($mail, $nome)
    {
        $this->mailer->addAddress($mail, $nome);
        return $this;
    }

    public function sendMail()
    {
        try {
            $this->mailer->CharSet = "utf-8";
            return $this->mailer->send();
        } catch (Exception $e) {
            echo "Erro no envio: {$this->mailer->ErrorInfo}";
            return false;
        }
    }
}