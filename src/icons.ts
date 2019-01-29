import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

const icons = [
  faFacebookF, faTwitter, faLinkedinIn, faWhatsapp, faFacebookMessenger,faEnvelope, faCommentAlt, faEllipsisH, faMinus
];

library.add(...icons);