import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { Box, Text, Button } from '@chakra-ui/react'
  import { useDisclosure, useColorModeValue, Spacer } from '@chakra-ui/react'


export default function PrivacyPolicy() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Text fontFamily={'Raleway'} _hover={{cursor: 'pointer', textDecoration: 'underline'}} color={useColorModeValue('#1BA3C1', '#1BA3C1')}><a onClick={onOpen}>Privacy Policy</a></Text>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={{lg: "40em", base: "35em"}} h={'80vh'} overflowY="auto" css={{
                            '&::-webkit-scrollbar': {
                            width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                            width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                            background: '#212121',
                            borderRadius: '24px',
                            },
                        }}>
          <ModalHeader fontFamily={'Raleway'} fontSize="3xl">Privacy Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={'Raleway'} fontWeight={'light'}>
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Privacy Policy</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. 
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue("#C1272D", "#FF5C61")}>Interpretations and Definitions</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Interpretation</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The words of which the initial letter is capitalized have meanings defined under the following conditions. 
            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Definitions</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>For the purposes of this Privacy Policy:</Text>
            <br />
            <Text fontSize="xs" textAlign={'justify'}>- Account means a unique account created for You to access our Service or parts of our Service.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Affiliate means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Application means the software program provided by the Company on any electronic device, named Critique Hall</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Company (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Critique Hall.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Country refers to: Philippines</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Personal Data is any information that relates to an identified or identifiable individual.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Service refers to the Application or the Website or both.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Website refers to Critique Hall, accessible from &lt;https://critiquehall.vercel.app&gt;</Text>
            <Text fontSize="xs" textAlign={'justify'}>- You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue("#C1272D", "#FF5C61")}>Collecting and Using Your Personal Data</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Types of Data Collected</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>1. Personal Data</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>While using Our Service, We may ask You to provide Us with certain personally
            identifiable information that can be used to contact or identify You.
            Personally identifiable information may include, but is not limited to:</Text>
            <br />
            <Text fontSize="xs" textAlign={'justify'}>- Email address</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- First name and Last name</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- Usage Data</Text>
            <Spacer />
            <br />
            <Text fontSize="sm" textAlign={'justify'}>2. Usage Data</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Usage Data is collected automatically when using the Service.</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Usage Data may include information such as Your Device&rsquo;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
            We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Tracking Technologies and Cookies</Text>            
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze
            Our Service. The technologies We use may include:</Text>
            <Spacer />
            <br />
            <Text fontSize="xs" textAlign={'justify'}>- Cookies or Browser Cookies. A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- Flash Cookies. Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read &ldquo;Where can I change the settings for disabling, or deleting local shared objects?	&rdquo; available at 	&lt;https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_&gt;</Text>          
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- Web Beacons. Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</Text>          
            <Spacer />
            <br />
            <Text fontSize="sm" textAlign={'justify'}>Cookies can be 	&ldquo;Persistent&rdquo; or 	&ldquo;Session&rdquo; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.</Text>
            <Spacer />
            <br />
            <Text fontSize="sm" textAlign={'justify'}>We use both Session and Persistent Cookies for the purposes set out below:</Text>
            <Spacer />
            <br />
            <Text fontSize="xs" textAlign={'justify'}>- Necessary / Essential Cookies</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Type: Session Cookies</Text>           
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Administered by: Us</Text>      
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</Text>   
            <br />
            <Text fontSize="xs" textAlign={'justify'}>- Cookies Policy / Notice Acceptance Cookies</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Type: Persistent Cookies</Text>           
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Administered by: Us</Text>      
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</Text>
            <br />
            <Text fontSize="xs" textAlign={'justify'}>- Functionality Cookies</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Type: Persistent Cookies</Text>           
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Administered by: Us</Text>      
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</Text>   
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Use of Your Personal Data</Text>
            <Spacer />            
            <Text fontSize="sm" textAlign={'justify'}>The Company may use Personal Data for the following purposes:</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- To provide and maintain our Service , including to monitor the usage of our Service.</Text>    
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</Text>    
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- To contact You: To contact You by email and mobile application&rsquo;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</Text>              
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- To manage Your requests: To attend and manage Your requests to Us.</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- For other purposes : We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service and your experience.</Text>
            <br />
            <Text fontSize="sm" textAlign={'justify'}>We may share Your personal information in the following situations:</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</Text>    
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</Text>    
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- With Your consent : We may disclose Your personal information for any other purpose with Your consent.</Text>              
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Retention of Your Personal Data</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Transfer of Your Personal Data</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Your information, including Personal Data, is processed at the Company&rsquo;s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to —
            and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless
            there are adequate controls in place including the security of Your data and other personal information.</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Disclosure of Your Personal Data</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Law enforcement</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Other legal requirements</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</Text>
            <br />
            <Text fontSize="xs" textAlign={'justify'}>- Comply with a legal obligation</Text>              
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- Protect and defend the rights or property of the Company</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- Prevent or investigate possible wrongdoing in connection with the Service</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- Protect the personal safety of Users of the Service or the public</Text>
            <Spacer />
            <Text fontSize="xs" textAlign={'justify'}>- Protect against legal liability</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Security of Your Personal Data</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Children&rsquo;s Privacy</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers. If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent&rsquo;s consent before We collect and use that information.</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Links to Other Websites</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&rsquo;s site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Changes to this Privacy Policy</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. We will let You know via email and/or a prominent notification on Our Service, prior to the change becoming effective and update the &ldquo;Last updated&rdquo; date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</Text>
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Contact Us</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>If you have any questions about this Privacy Policy, You can contact us:</Text>
            <br />
            <Text fontSize="sm" textAlign={'justify'} display="flex">- By email: <Text fontSize="xs" fontStyle={'italic'}  color={useColorModeValue("#C1272D", "#FF5C61")} ml={1}>critiquehall@gmail.com</Text></Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>- By phone number: 09980844162</Text>
            <br />
            <Text fontFamily={'Raleway'} fontSize="sm">This Agreement was created on February 16, 2022. No changes have been made since.</Text>
          </ModalBody>

          <ModalFooter>
            <Button fontFamily={'Raleway'}  bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    )
}
