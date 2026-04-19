import type {Meta, StoryObj} from '@storybook/react';
import {ScrollFab} from "./ScrollFab.tsx";
import {Paper} from "../paper/Paper.tsx";


const meta: Meta<typeof ScrollFab> = {
    component: ScrollFab,
    title: 'Utils/Scroll FAB',
    render: () => <div className="paper-story">
        <Paper showHoverEffect={true}>
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque mattis molestie. Sed
                quam massa, maximus nec urna volutpat, finibus ultrices ipsum. Suspendisse rutrum interdum turpis, vel
                accumsan elit ultrices nec. Etiam tempus ipsum id nisl ultricies, in placerat neque lacinia. Nulla
                iaculis sodales sapien, ac malesuada tellus. Sed scelerisque ornare mauris, sit amet ornare sem congue
                vitae. Proin vehicula ipsum posuere dignissim feugiat. Donec vitae efficitur justo, sit amet luctus
                massa.</p>

            <p>Donec vitae purus et lorem dignissim tincidunt. Maecenas aliquam tellus ac orci aliquam, id tincidunt
                risus porttitor. Duis massa felis, aliquam in justo et, congue rhoncus tellus. Nunc semper interdum
                eros. Fusce in est at massa feugiat euismod vitae a nisi. Curabitur rhoncus libero dolor, nec
                pellentesque mauris feugiat sit amet. Pellentesque mollis sed diam eu varius. Aliquam aliquam sit amet
                sem ut porta.</p>

            <p>Suspendisse faucibus lacinia enim vitae consequat. Nunc rhoncus mauris nunc. In porttitor ac augue ac
                dapibus. Suspendisse dignissim ex ac ante facilisis dignissim. Donec non mollis magna. Pellentesque in
                sagittis magna, viverra rutrum tellus. Pellentesque ullamcorper lobortis eros, quis semper leo placerat
                et. Maecenas pellentesque viverra nibh ac posuere. Proin eu varius nulla. In dui tortor, malesuada et
                efficitur nec, finibus tincidunt mi. Fusce ultrices vulputate finibus. Pellentesque maximus luctus nulla
                in suscipit.</p>

            <p>Vestibulum ultrices, enim sit amet rhoncus ultrices, quam nulla rhoncus dolor, a rutrum mi elit vel ante.
                Cras dictum, odio et tristique imperdiet, tortor metus dignissim metus, sed lacinia ex elit luctus
                lacus. Praesent venenatis ornare nisi eu semper. Donec vel porta augue. Interdum et malesuada fames ac
                ante ipsum primis in faucibus. Sed gravida lobortis dui vel tincidunt. Duis et purus et erat viverra
                interdum. Vestibulum nec feugiat ligula. Mauris est neque, placerat eu lorem vitae, varius mollis dui.
                Quisque neque velit, iaculis at porttitor vel, hendrerit quis neque. Etiam cursus, ligula vel
                condimentum consequat, urna diam congue ex, eget vestibulum dolor quam sit amet metus. Nunc tempor
                libero felis, vitae finibus eros porttitor sed. Phasellus sed erat condimentum nisi efficitur imperdiet
                dignissim sed dui. Donec lacinia justo eu quam feugiat, a scelerisque lorem ultrices. Proin commodo nunc
                mauris, ut vestibulum tortor fringilla quis.</p>

            <p> Nam velit augue, malesuada et mi ac, pulvinar venenatis mauris. Quisque tortor ligula, ullamcorper sed
                risus tempus, ultrices gravida eros. Sed gravida, enim ac porta maximus, lacus purus scelerisque metus,
                in pretium leo orci in quam. Vestibulum viverra vehicula sem, in fermentum libero vulputate id. Cras
                quis rutrum sem. Aliquam et nunc mi. Sed gravida nulla ac augue consequat, dictum feugiat ipsum
                porttitor. Morbi vel pharetra enim. Morbi eget magna enim. Duis quam quam, efficitur eu sapien ac,
                convallis mollis metus. Vivamus congue id eros placerat porta. Fusce a lectus tellus. Vivamus augue
                tortor, dapibus ac ullamcorper sit amet, convallis at sem.</p>

            <p>Morbi nunc felis, posuere vitae erat vel, dictum dictum orci. Mauris id nunc placerat, ornare lacus eget,
                maximus tortor. Nam vestibulum diam neque, at eleifend est accumsan at. Ut eleifend lorem eget varius
                bibendum. Curabitur condimentum pharetra arcu in sollicitudin. Vivamus vitae efficitur urna. Sed posuere
                venenatis quam at dapibus.</p>

            <p>Duis vitae commodo mauris. Cras elementum, diam quis euismod vehicula, felis turpis luctus felis, et
                eleifend massa odio vel neque. Nam non orci arcu. Sed vel justo a orci feugiat commodo. Donec ut viverra
                felis, vitae maximus velit. Cras sit amet lacus ligula. Morbi urna turpis, gravida vel felis vitae,
                sagittis hendrerit risus. Etiam in euismod nisl. Integer tellus lectus, aliquam id odio at, mollis
                egestas nulla. Donec pellentesque pellentesque imperdiet. Praesent at dui sapien. Etiam vitae vehicula
                tortor.</p>

            <p>Nulla vestibulum tempor neque, a sodales neque tristique a. Donec aliquam, magna eu consequat suscipit,
                magna augue convallis dolor, in elementum sapien enim eu odio. Integer finibus turpis non pretium
                tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus porttitor tellus, sed
                ultricies mi fermentum sed. Pellentesque fermentum eleifend tortor eget iaculis. Maecenas placerat risus
                interdum lectus vulputate faucibus. Donec convallis iaculis purus id vehicula. Curabitur eu tristique
                neque, eu consectetur dui. Curabitur bibendum nibh eleifend mi varius congue vehicula at nulla. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat tempus varius. Etiam quis felis
                placerat, aliquam sem sit amet, dapibus nunc.</p>

            <p>Maecenas vulputate ante tellus, sed sagittis tellus iaculis eu. Nulla elit orci, porttitor a fermentum
                vel, tincidunt vitae mauris. Nunc ante purus, lobortis non sodales a, fringilla sed tortor. Suspendisse
                dolor dui, hendrerit at lectus sed, viverra euismod mi. Duis aliquam, neque vitae semper pulvinar, odio
                lectus pharetra odio, at scelerisque purus dui at turpis. Ut consequat euismod mauris, tristique rutrum
                lacus auctor eu. Vivamus porta magna at facilisis rhoncus. Mauris iaculis lectus vitae dui tempor
                volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Pellentesque convallis consectetur lobortis. Praesent pretium id est ut laoreet. Fusce pharetra id dolor
                quis euismod. Aenean lacinia efficitur feugiat. Curabitur dignissim malesuada enim, sed placerat risus
                fermentum sed. Nam pellentesque bibendum odio nec convallis.</p>

            <p>Suspendisse non gravida diam, eu maximus eros. In nec nisi eget mi sagittis elementum eu eget quam.
                Praesent ante velit, egestas sit amet ultrices eget, efficitur vitae tortor. Aenean vel leo ut justo
                fermentum ornare. Pellentesque nisl arcu, ornare at pellentesque nec, condimentum sit amet magna.
                Vivamus porta lacus sed enim egestas hendrerit. Cras eget mollis purus.</p>
        </Paper>
        <ScrollFab/>
    </div>,
};

export default meta;
type Story = StoryObj<typeof Paper>;
export const Default: Story = {
    args: {}
};
