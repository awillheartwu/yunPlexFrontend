<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { get } from './apis/index.ts'

const status = ref(0)
const loading = ref(false)

const form_data = reactive({
    scan_interval: 0,
    song_limit: 0,
    download_dir: '',
    phone: 0,
    password: '',
    playlist: 0,
    plex_server: '',
    plex_port: '',
    plex_token: ''
})

const submit = () => {
    console.log(form_data)
    loading.value = true
    status.value = 0
    loading.value = false
}

const changeStatus = () => {
    status.value = 1
}

onMounted(async () => {
    // 获取系统环境变量
    try {
        const data = await get('/ypsetting')
        const {
            scan_interval,
            song_limit,
            download_dir,
            phone,
            password,
            playlist,
            plex_server,
            plex_port,
            plex_token
        } = data as {
            scan_interval: number
            song_limit: number
            download_dir: string
            phone: number
            password: string
            playlist: number
            plex_server: string
            plex_port: string
            plex_token: string
        }

        form_data.scan_interval = scan_interval
        form_data.song_limit = song_limit
        form_data.download_dir = download_dir
        form_data.phone = phone
        form_data.password = password
        form_data.playlist = playlist
        form_data.plex_server = plex_server
        form_data.plex_port = plex_port
        form_data.plex_token = plex_token
    } catch (e) {
        console.log('♿️ - onMounted - e:', e)
    }
})
</script>

<template>
    <div class="top">
        <h1>yunPlex</h1>
        <h2>配置</h2>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-button type="primary" plain @click="changeStatus">进入修改</el-button>
            </el-col>
            <el-col :span="12">
                <el-button type="success" plain @click="submit">保存</el-button>
            </el-col>
        </el-row>
    </div>
    <div class="bottom">
        <el-form :disabled="status === 0" :model="form_data" style="width: 100%">
            <el-form-item label="扫描间隔">
                <el-input v-model="form_data.scan_interval"></el-input>
            </el-form-item>
            <el-form-item label="扫描歌曲数">
                <el-input v-model="form_data.song_limit"></el-input>
            </el-form-item>
            <el-form-item label="下载目录">
                <el-input v-model="form_data.download_dir"></el-input>
            </el-form-item>
            <el-form-item label="网易云登录手机号">
                <el-input v-model="form_data.phone"></el-input>
            </el-form-item>
            <el-form-item label="网易云登录密码">
                <el-input v-model="form_data.password"></el-input>
            </el-form-item>
            <el-form-item label="网易云歌单ID">
                <el-input v-model="form_data.playlist"></el-input>
            </el-form-item>
            <el-form-item label="Plex服务器地址">
                <el-input v-model="form_data.plex_server"></el-input>
            </el-form-item>
            <el-form-item label="Plex服务器端口">
                <el-input v-model="form_data.plex_port"></el-input>
            </el-form-item>
            <el-form-item label="Plex服务器Token">
                <el-input v-model="form_data.plex_token"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.top {
    text-align: center;
    margin-bottom: 40px;
}

.el-button {
    margin-top: 20px;
    width: 100%;
    padding: 10px 0;
    font-size: 18px;
    border-radius: 6px;
}

.bottom {
    background-color: #fff;
    padding: 40px;
    /* border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1); */
    margin-top: 20px;
}

.el-form {
    margin: 0 auto;
    max-width: 600px;
}

.el-form-item {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
}

.el-form-item__label {
    font-size: 1000px;
    min-width: 150px;
    font-size: 16px;
    color: #555;
    margin-right: 20px;
    text-align: right;
}

.el-input {
    flex: 1; /* Ensure input takes the remaining space */
}

.el-input .el-input__inner {
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 10px 15px;
    font-size: 16px;
    color: #666;
}
</style>
