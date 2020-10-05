<template>
  <div class="container">
    <nav>
      <a href="/" class="navbar-brand">
        <h1>席替え番長</h1>
      </a>
    </nav>
    <div class="row">
      <div class="col-sm-8">
        <h2>メンバー {{ members.length}} 人</h2>
        <ul>
          <li v-for="member in sortedMembers" :key="member.index">
            <i class="fa" :class="icons[member.gender]"></i>
            {{ member.name }}
          </li>
        </ul>
        <button v-if="members.length" @click="shuffle" class="btn btn-success">席替え</button>
      </div>

      <div class="col-sm-4">
        <h2>メンバー追加</h2>
        <form @submit.prevent="save">
          <div class="form-group">
            <label for="gender">性別</label>
            <div v-for="option in genderOptions" :key="option" class="radio-wrapper">
              <input
                type="radio"
                name="gender"
                :value="option"
                @change="changeGender"
                :checked="option === form.gender"
              />
              {{ option }}
            </div>
          </div>
          <div class="form-group">
            <label for="name">名前</label>
            <input type="text" id="name" v-model="form.name">
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="追加">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import _ from 'lodash'

interface Member {
  name: string
  gender: string
  index: number
}

interface Form {
  name: string
  gender: string
}

export default defineComponent({
  setup() {
    const members = reactive<Member[]>([])
    const icons = {
      '男': 'fa-mars',
      '女': 'fa-venus'
    }
    function shuffle() {
      _(members).shuffle().each((member: Member, i:number) => member.index = i)
    }
    const sortedMembers = computed(() => _.sortBy(members, 'index'))

    const form = reactive<Form>({name: '', gender: '女'})

    const genderOptions = ['女', '男']
    function changeGender(event: Event) {
      if (!event || !event.target) {
        return
      }
      const element = event.target as HTMLInputElement
      form.gender = element.value
    }
    function save() {
      const newMember: Member = Object.assign({}, form, { index: members.length})
      members.push(newMember)
      form.name = ''
    }

    return {
      members,
      icons,
      shuffle,
      sortedMembers,
      genderOptions,
      form,
      changeGender,
      save }
  }
})
</script>

<style scoped>
.radio-wrapper {
  display: inline-block;
  margin-left: 1em;
  margin-right: 1em;
}
.radio-wrapper:last-of-type {
  margin-right: 0;
}
.radio-wrapper input {
  margin-right: 0.5em;
}
.fa-mars {
  color: #03328b;
}
.fa-venus {
  color: #eb90c8;
}
</style>