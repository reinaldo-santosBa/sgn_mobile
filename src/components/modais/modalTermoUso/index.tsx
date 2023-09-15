import React, { useContext, useState } from 'react'
import * as S from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { AuthContext } from '../../../contexts/contextApi'
interface Iprops {
    func: () => void;
    user: string;
}

const ModalTermoUso: React.FC<Iprops> = ({ func, user }) => {
  const {
    version,
    url,
    refreshToken,
    setTermoAccept
  } = useContext(AuthContext)
  const [accept, setAccept] = useState(false)
  const onClick = () => {
    axios.patch(`${url}${version}/usuario/tradeTerm`, {
      USUA_SIGLA: user
    },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }
    )
      .then(() => {
        alert('Termo aceito com sucesso')
        setTermoAccept('S')
        func()
      })
      .catch((e) => {
        alert('Erro ao aceitar o termo' + e)
      })
  }
  return (
        <>
            <S.AreaModal>
                <S.AreaContent>
                    <S.TextTitleMain>
                        TERMOS DE USO
                    </S.TextTitleMain>
                    <S.TextSubTitleMain>
                        Termos de Uso do Sistema SGN
                    </S.TextSubTitleMain>
                    <S.TextSubTitleMain>
                        Versão 01 – data 01/01/2023
                    </S.TextSubTitleMain>
                    <S.TextTitleParagraph>
                        1 – Definições
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Você irá identificar ao longo desse documento, alguns termos e definições com certa frequência. Que tal saber o que cada um deles significa para compreendê-los melhor? As disposições constantes destes Termos, sempre que usadas com a primeira letra em maiúscula, no plural ou no singular, terão o significado descrito abaixo. Vamos lá!

                        Login é o portal que consiste em uma plataforma web para o sistema ERP SGN SISTEMAS e Aplicativos Mobile

                        Credenciais de Acesso significa o login e senha recebidos pelo Usuário para acesso ao Sistema ERP SGN SISTEMAS.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Informações do Usuário são todas as informações constantes das bases de dados da SGN SISTEMAS, relativas ao Usuário e de operações de gestão a ele relacionadas, transacionadas nos sistemas web, incluindo-se, mas não se limitando, a dados pessoais e dados cadastrais.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Propriedade Intelectual refere-se aos programas de computador, arquivos, textos, ícones, desenhos, vídeos, sons, marcas, logotipos, layouts, templates, invenções, modelos de utilidade, desenho industrial, obras artísticas, científicas ou literárias e todos os materiais, obras, planos e objetos, em qualquer formato ou suporte físico, que sejam passíveis de proteção com base na Lei de Propriedade Industrial (Lei nº 9.279/1996), na Lei de Direito Autoral (Lei nº 9.610/1998), na Lei de Software (Lei nº 9.609/1998), e também em convenções internacionais de que o Brasil seja parte ou em leis nacionais dos países em que a SGN atue e disponibilize acesso a Área do Usuário, que sejam de titularidade, posse, domínio da SGN SISTEMAS, ou que sejam por ela utilizados na criação, fornecimento e manutenção da Área do Usuário, estejam eles registrados, patenteados, com pedido de registro ou depósito pendente ou não.

                        Termos são estes Termos de Uso;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Usuário ou Você refere-se a você, que utiliza a Área do Usuário da SGN SISTEMAS para acessar o sistema ERP para gestão de negócios da sua empresa, bem como quaisquer terceiros que venham a ter acesso.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        2 – O que é este documento?
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Este documento são os Termos de Uso, que descrevem as regras de uso da ERP SGN SISTEMAS que todos nós, você, terceiros e a SGN SISTEMAS deverão observar. Estes Termos não versam sobre a forma com que a SGN SISTEMAS trata seus dados pessoais, ok?
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Caso Você queira compreender de forma clara e precisa, as regras e informações de como a SGN SISTEMAS trata os seus dados pessoais no ERP SGN SISTEMAS, é necessário que você acesse a Política de Privacidade.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        3 – Quem é o responsável pelo ERP SGN SISTEMAS?
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        É a INOVA 3G SISTEMAS LTDA, localizada na Rua Arthur de Azevedo Machado, 1459 – Stiep – Salvador BA, CEP 41.770-790 inscrita no CNPJ: 07.047.220/0001-10.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Importante destacar que a INOVA 3G SISTEMAS não é responsável pelo uso indevido ou perda dos Dados Pessoais em ambientes em que não possui acesso ou controle, portanto, dos Dados Pessoais, a responsabilidade não será nossa.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        4 – O que é o ERP SGN SISTEMAS?
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        É um sistema ERP de Gestão Financeira, Suprimentos, Imobiliário, Locação de Equipamentos e Energia Solar.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        5 – Aceite dos Termos
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Ao aceitar estes Termos, você declara que leu e compreendeu todas as suas regras.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        A partir do momento em que você aceitar estes Termos, as regras contidas nesses documentos passarão a regular a relação que você tem com a gente no que se refere ao uso do ERP SGN SISTEMAS e Aplicativos Mobile.
                        Você declara também que está ciente de que estes Termos poderão ser alterados a qualquer tempo. Quando isso acontecer, vamos te mandar um e-mail com informações sobre as alterações.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        E aqui um pedido especial: caso discorde ou tenha dúvidas sobre o conteúdo destes Termos, por favor não utilize a área de Login e entre em contato com SGN SISTEMAS por meio de nossa Central de Atendimento – telefone (71) 3561-7220.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        6 – Utilização da Área de Acesso ERP SGN SISTEMAS
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Acesso ao ERP SGN SISTEMAS e Aplicativo Mobile.  Você receberá automaticamente um e-mail com um link para o seu primeiro acesso ERP SGN SISTEMAS e Aplicativo Mobile.
                    </S.TextParagraph>
                    <S.TextParagraph>

                        Credenciais de Acesso. Você declara estar ciente de que suas Credenciais de Acesso possuem caráter pessoal e são intransferíveis, devendo zelar para manter sua confidencialidade e sigilo.
                    </S.TextParagraph>
                    <S.TextParagraph>

                        Você não poderá repassar as suas Credenciais de Acesso a terceiros. Caso isso ocorra, Você reconhece que todas as suas informações do ERP SGN SISTEMAS quanto do Aplicativo Mobile poderão ser acessadas por tais terceiros e que, nessa hipótese, Você será o único responsável pelo eventual uso indevido ou desvio de suas Credenciais de Acesso e das informações constantes, bem como caso haja o uso ilegal e/ou não autorizado de tais informações e de suas Credenciais de Acesso como consequência de tal fato, inclusive nas hipóteses de culpa e/ou dolo, isentando desde já a INOVA 3G SISTEMAS LTDA de qualquer responsabilidade.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Em caso de suspeita de comprometimento do sigilo e confidencialidade das suas Credenciais de Acesso, você deverá informar a SGN SISTEMAS por meio de nossa Central de Atendimento – telefone (71) 3561-7220. Adicionalmente, é recomendável que você realize a troca de sua senha.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Acesso via robôs. O acesso ao ERP SGN SISTEMAS e Aplicativos Mobile via robôs não poderá ocorrer. Caso isso ocorra, INOVA 3G SISTEMAS LTDA poderá, a seu exclusivo critério, restringir e até mesmo bloquear o acesso do Usuário.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        7 – Obrigações Gerais
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Obrigações e declarações do Usuário. Você, ao aceitar estes Termos, concorda em:
                    </S.TextParagraph>
                    <S.TextParagraph>
                        1 - Utilizar o ERP SGN SISTEMAS com responsabilidade e boa-fé, dentro dos limites estabelecidos por estes Termos e pelas funcionalidades;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        2 - Manter a salvo e em sigilo suas Credenciais de Acesso;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        3 - Manter as suas informações cadastrais atualizadas e corretas;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        4 - Informar a central de atendimento sobre quaisquer alterações cadastrais ou desativação do seu cadastro.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Integridade do ERP SGN SISTEMAS e violações dos Termos.{'\n'}
                        Aqui vamos descrever algumas ações que você não poderá fazer:
                    </S.TextParagraph>
                    <S.TextParagraph>
                        1 - Modificar, apagar, sabotar ou de qualquer forma violar, ou mesmo auxiliar, incentivar ou facilitar a terceiro a violação do ERP. E aqui falamos tanto do componente web como o serviço conectado subjacente, como o aplicativo Mobile;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        2 - Violar conteúdo protegido por direitos de Propriedade Intelectual da INOVA 3G SISTEMAS LTDAou de qualquer afiliado, subcontratado ou parceiro;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        3 - Buscar, abordar ou aceitar abordagem de terceiro para, de qualquer forma, utilizar o ERP ou qualquer de seus componentes para fraudar estes Termos e/ou violar a lei, ou terceiro a realizar esses atos;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        4 - Utilizar para divulgar informações que, de qualquer forma, possam implicar violação à legislação brasileira, a direitos de propriedade da INOVA 3G SISTEMAS LTDA e/ou de terceiros ou dos bons costumes, incluindo, sem limitação, a violação de direitos de propriedade intelectual e de privacidade, ou a produção e divulgação de conteúdo ilegal, imoral, inapropriado ou ofensivo;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        5 - Copiar, ceder, sublicenciar, vender, dar em locação ou em garantia, reproduzir, doar, alienar de qualquer forma, transferir total ou parcialmente, sob quaisquer modalidades, gratuita ou de forma onerosa, provisória ou permanentemente, a assim como seus módulos, partes, manuais ou quaisquer informações a ela relativas;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        6 - Empregar softwares, técnicas e/ou artifícios com o intuito de utilizar indevidamente para práticas nocivas ao ERP SGN SISTEMAS ou a terceiros, tais como exploits, spamming, flooding, spoofing, crashing, root kits etc.;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        7 - Reproduzir, adaptar e ou modificar, no todo ou em parte, sem a autorização expressa da INOVA 3G SISTEMAS LTDA;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        8 - Publicar ou transmitir qualquer arquivo que contenha vírus ou quaisquer outros elementos nocivos que possam, de alguma forma, interferir no bom funcionamento do ERP SGN SISTEMAS ou nos dispositivos informáticos de seus Usuários;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        9 - Utilizar o ERP SGN SISTEMAS para finalidade diversa daquela para a qual foi disponibilizada;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        10 - Divulgar, utilizar ou modificar indevidamente os dados dos Usuários;
                    </S.TextParagraph>
                    <S.TextParagraph>
                        11 - Utilizar o ERP SGN SISTEMAS, ou permitir seu uso, para benefício ilícito próprio ou de terceiros.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Obrigação de monitoramento de condutas/conteúdos. É importante que você saiba que a INOVA 3G SISTEMAS não monitora a utilização do ERP SGN SISTEMAS por seus Usuários. Assim, INOVA não será responsável por averiguar as condutas dos Usuários. Mas, se formos notificados por terceiro interessado ou tomarmos conhecimento por descoberta fortuita: (i) da existência de qualquer tipo de conteúdo ilícito inserido no ERP SGN SISTEMAS, esse conteúdo será prontamente removido, com a identificação do responsável e preservação das informações necessárias à colaboração com as Autoridades Públicas responsáveis, quando necessário; (ii) de conduta incompatível com os objetivos, a INOVA poderá suspender ou cancelar o acesso do Usuário, sem prejuízo da adoção de eventuais medidas legais aplicáveis.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        8 – Execuções de Garantias
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Exatidão de Informações. Todas as informações divulgadas na área de Login são extraídas do sistema ERP SGN.

                        Os serviços e informações constantes da área de login e site são fornecidos tal como se encontram, não garantindo a INOVA que sejam considerados aptos ou adequados para qualquer outra finalidade além daquelas específica e expressamente descritas nestes Termos.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Serviços de terceiros. Ao utilizar o ERP SGN SISTEMAS, você tem ciência de que tal uso depende ou pode depender da contratação de serviços de terceiros, tal como acesso à rede de internet, entre outros, sendo que a INOVA não garante que tais serviços sejam adequados ou suficientes para possibilitar o uso sem falhas ou defeitos.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Falhas de equipamentos ou dispositivos móveis. A INOVA 3G SISTEMAS também não pode garantir a absoluta segurança, integridade e confidencialidade dos dados, pessoais ou não, inseridos no ERP SGN SSITEMAS e Aplicativos Mobile caso os dispositivos móveis ou fixos utilizados para acesso o ERP e Mobile apresentem, por si, vulnerabilidades de segurança, sejam elas acidentais (erros, bugs, etc) ou propositais, sejam elas causadas por terceiros (malware, violação de código, ataques cibernéticos) ou pelo próprio Usuário (por meio de procedimentos que diminuem a segurança do dispositivo, como jailbrake ou obtenção de acesso root).
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Disponibilidade e Continuidade. A INOVA 3G SISTEMAS não garante a disponibilidade contínua do ERP SGN SISTEMAS e serviços agregados (mobile), estando está sujeita a interrupções por falha ou manutenção, podendo ainda ser suspensa ou cancelada mediante simples notificação prévia com pelo menos 30 (trinta) dias de antecedência.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        9 – Execuções de Responsabilidades
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        É importante deixar claro que a INOVA 3G SISTEMAS, subcontratantes e parceiros não são responsáveis por quaisquer danos, sejam eles de natureza física, moral, estética, econômica, acidental, punitiva, perda de chance, perda de dados, ou qualquer outra que o Usuário ou um terceiro venha a experimentar direta ou indiretamente relacionados ao uso do ERP SGN SISTEMAS, decorrentes de culpa exclusiva ou dolo do Usuário ou terceiros. O Usuário também reconhece que a INOVA 3G SISTEMAS não é responsável por quaisquer tipos de danos oriundos de, mas não limitado a: falhas dos equipamentos; vulnerabilidades de segurança nos dispositivos de acesso ao SGN SISTEMAS e Aplicativos Mobile, danos causados por ações ou omissões do Usuário; utilização indevida dos equipamentos e dispositivos; interrupções ou erros na transmissão de dados pela internet ou telefonia celular; intervenção de qualquer espécie do poder público ou ainda força maior ou caso fortuito.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Você entende e concorda que a INOVA 3G SISTEMAS LTDA irá adotar medidas de segurança e de proteção compatíveis com a natureza dos dados coletados, usados e armazenados pelo ERP SGN SISTEMAS e Aplicativos Mobile. No entanto, o ERP e Mobile não garante, de forma alguma, que tais medidas de segurança sejam isentas de erros ou que não estejam sujeitas à interferência de terceiros (hackers, entre outros). Ao aceitar o termo de uso e/ou usar o ERP SGN, o Usuário entende e assume expressamente esse risco, e concorda que a INOVA 3G SISTEMAS não será responsável por tal conduta.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Direito de regresso. Caso a INOVA 3G SISTEMAS seja implicada de qualquer maneira em cobranças extrajudiciais ou qualquer outra medida judicial em decorrência de danos causados por um Usuário ou pessoas pelas quais o Usuário é responsável, o Usuário se obriga a intervir nos procedimentos em trâmite, de modo a isentar a INOVA 3G de qualquer responsabilidade e de qualquer possível resultado negativo. Ainda, a INOVA terá direito integral de regresso contra seus Usuários quando o dano a ser indenizado decorra direta ou indiretamente de culpa de um Usuário.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Acesso a logs. A INOVA 3G SISTEMAS não tem a obrigação de fornecer e não fornecerá eventuais logs ou registros de conexão e de acesso à aplicação que não digam respeito ao próprio Usuário solicitante, exceto se assim determinado por decisão judicial.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Compartilhamento de Informações dos Usuários. É importante que Você também saiba que as Informações do Usuário poderão ser compartilhadas com Operadores, (“Empresas”) que tenham firmado contrato com a INOVA 3G SISTEMAS, caso Você conceda o seu consentimento e realize a escolha acerca de quais delas poderão receber referidos dados. Mas, lembramos que esse compartilhamento não se confunde com o instituto da portabilidade. Caso surjam dúvida sobre o tema, entre em contato com a INOVA 3G SISTEMAS pelo e-mail tony.ribeiro@sgnsistemas.com.br, encarregado DPO.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        O Usuário reconhece e aceita que ao conceder o seu consentimento e escolher as Empresas, o faz de forma livre e por sua própria vontade, risco e responsabilidade. É importante que Você saiba que, ainda que a INOVA 3G SISTEMAS deixe claro para tais Empresas que a finalidade de uso dos dados deverá estar restrita ao desenvolvimento de produtos e serviços em favor do Usuário, caberá à INOVA 3G SISTEMAS apenas e tão somente o compartilhamento dos dados, desde que por Você autorizado, não sendo a INOVA 3G SISTEMAS responsável por quaisquer perdas e danos e/ou prejuízos e lucros cessantes que Você possa ter que arcar devido à utilização e Tratamento de seus Dados Pessoais por tais Empresas.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Caso fortuito e Força Maior. O Usuário concorda que, nas hipóteses de caso fortuito ou força maior, nos termos do artigo 393 do Código Civil Brasileiro, a INOVA 3G SISTEMAS LTDA não será responsabilizada.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        10 – Indenização
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        O Usuário concorda não apenas em defender e indenizar, mas também manter indene a INOVA 3G SISTEMAS LTDA, diretores, empregados e agentes, de e contra quaisquer encargos, ações ou demandas, incluindo, mas não limitado, a honorários advocatícios razoáveis, resultantes: (i) da sua eventual utilização indevida do ERP SGN SISTEMAS; ou (ii) da violação das condições ora pactuadas.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        11 – Propriedade Intelectual
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Licenciamento INOVA 3G SISTEMAS. Estes Termos concedem ao Usuário uma licença pessoal, mundial, revogável, não exclusiva e intransferível de acesso ao ERP SGN SISTEMAS, sendo certo que o Usuário não poderá utilizar ou permitir o uso do ERP e Aplicativos Mobile para qualquer outra finalidade que não expressamente prevista nestes Termos. Assim, o Usuário declara-se ciente de que é terminantemente proibido copiar, modificar, distribuir ou vender serviços disponibilizados pela INOVA 3G SISTEMAS, por meio do ERP SGN SISTEMAS, bem como qualquer parte desta.
                    </S.TextParagraph>
                    <S.TextParagraph>

                        Propriedade intelectual da INOVA 3G SISTEMAS. A INOVA 3G SISTEMAS é a titular exclusiva de todos os direitos, morais e patrimoniais, incidentes ou eventualmente incidentes sobre aspectos visuais e/ou artísticos do ERP SGN SISTEMAS e Aplicativo Mobile, bem como relativos ao código-fonte, inteligência artificial, elementos técnicos, de design, de processos, relatórios, e outros que ajudam a caracterizar o ERP SGN, a aplicação em si, todos os sinais distintivos, marcas, logos e qualquer material passível de proteção por direitos autorais ou propriedade industrial. É estritamente proibido qualquer tipo de cópia, alteração ou redistribuição do ERP SGN SISTEMAS e seus Aplicativos Mobile do website, do código-fonte ou de qualquer elemento incluído sob a sigla “Propriedade Intelectual”, como descrevemos acima, em parte ou no todo. Você também concorda que não vai fazer, tentar fazer, ou ajudar alguém a fazer nenhum tipo de engenharia reversa ou tentativa de acesso ao código fonte do ERP SGN SISTEMAS e seus Aplicativos Mobile.

                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        12 – Vigência e Rescisão
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Os Termos vigerão por prazo indeterminado, a partir do primeiro acesso do Usuário no ERP SGN SISTEMAS e seus Aplicativos Mobile.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Caso Você viole estes Termos ou a lei e/ou regulamentação vigentes, a INOVA 3G SISTEMAS LTDA fica autorizada, a seu critério, a suspender ou cancelar o seu acesso ao ERP SGN SISTEMAS e seus Aplicativos Mobile.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        13 – Disposições Gerais
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Estes Termos não geram nenhum contrato de sociedade, de mandato, franquia ou relação de trabalho entre você e a INOVA 3G SISTEMAS.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Caso qualquer disposição destes Termos seja considerada ilegal, nula ou inexequível por qualquer razão, as disposições restantes não serão afetadas e manter-se-ão válidas e aplicáveis na máxima extensão possível.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Estes Termos poderão ser alterados a qualquer tempo e sempre a última versão é a que valerá.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Do nosso lado, saiba que se fizermos qualquer alteração nestes Termos, vamos colocar um aviso na Área de Login do ERP SGN SISTEMAS te enviaremos um e-mail com os Termos de Uso atualizados. Por isso, é super importante Você manter seus dados de contato sempre atualizados.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Ah, ficou na dúvida sobre a data da versão dos Termos de Uso em vigor? No início do documento a gente deixa destacada a data para Você conferir.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Estes Termos constituem a totalidade do acordo sobre as condições de uso do ERP SGN SISTEMAS e seus Aplicativos Mobile.
                    </S.TextParagraph>
                    <S.TextParagraph>
                        Qualquer falha da INOVA 3G SISTEMAS para impor ou exercer qualquer disposição destes Termos ou direitos conexos, não constitui uma renúncia a esse direito ou disposição.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        14 – Lei e Foro Aplicáveis
                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Estes Termos de Uso serão interpretados exclusivamente segundo as leis do Brasil.

                        Fica eleito o Foro da Comarca de Salvador, Estado da Bahia, para dirimir quaisquer dúvidas, questões ou litígios decorrentes dos presentes Termos, renunciando as partes a qualquer outro, por mais privilegiado que seja.
                    </S.TextParagraph>
                    <S.TextTitleParagraph>
                        15 – Dúvidas Sugestões e Reclamações?

                    </S.TextTitleParagraph>
                    <S.TextParagraph>
                        Estamos construindo uma relação de abertura e confiança com você. Então, sempre será importante estarmos próximos. Precisou da gente? Gostaria de enviar alguma solicitação, reclamação, pedido de informação ou qualquer outra informação? Entre em contato com a INOVA 3G SISTEMAS LTDA por meio de nossa Central de Atendimento – telefone (71) 3561-7220. Será um prazer atendê-lo.
                    </S.TextParagraph>
                    <S.CheckBoxArea
                        onPress={() => {
                          setAccept(!accept)
                        }}
                    >
                        <S.CheckBox>
                            {
                                !accept
                                  ? <Icon
                                        name='close'
                                        size={30}
                                        color='#b12121'
                                    />
                                  : <Icon
                                        name='check'
                                        size={30}
                                        color='#00aa09'
                                    />
                            }
                        </S.CheckBox>
                        <S.CheckBoxText>
                            Li os termos e aceito
                        </S.CheckBoxText>
                    </S.CheckBoxArea>
                    <S.BtnAceito
                        color={accept ? '#54cf5a' : '#ccc'}
                        onPress={onClick}
                        disabled={!accept}
                    >
                        <S.TxtBtn>
                            Aceito
                        </S.TxtBtn>
                    </S.BtnAceito>
                </S.AreaContent>
            </S.AreaModal>
        </>
  )
}

export { ModalTermoUso }
